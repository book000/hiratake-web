// pages > contact

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { CMSPost } from '@/types/cms'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo, BreadcrumbJsonLd } from 'next-seo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { css } from '@emotion/react'
import { LStack } from '@/components/LStack'
import { AppButton } from '@/components/AppButton'
import { PageContainer } from '@/components/PageContainer'
import { client } from '@/lib/client'
import { config } from '@/utils/config'
import { articleStyle } from '@/utils/style'

export const getStaticProps: GetStaticProps<{
  post: CMSPost
}> = async () => {
  const post = await client.getListDetail({
    endpoint: 'pages',
    contentId: 'contact',
  })
  return {
    props: {
      post,
    },
  }
}

// ----------------------------------------
// Type
// ----------------------------------------

type ContactFormInputs = {
  name: string
  email: string
  content: string
  privacy: boolean
}

// ----------------------------------------
// JSX
// ----------------------------------------

export const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const router = useRouter()
  const currentUrl = `https://${config.domain}${router.pathname}`

  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [formPostSuccess, setFormPostSuccess] = useState<boolean>(false)
  const [formPostFailure, setFormPostFailure] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>()
  const currentPrivacyInput = watch('privacy', false)

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      setFormLoading(true)
      setFormPostSuccess(false)
      setFormPostFailure('')

      if (!process.env.NEXT_PUBLIC_HYPERFORM_ID) {
        throw new Error(
          'フォームの送信に失敗しました。管理者にお問い合わせください。'
        )
      }

      const response = await fetch(
        `https://hyperform.jp/api/async/${process.env.NEXT_PUBLIC_HYPERFORM_ID}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            content: data.content,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          'フォームの送信に失敗しました。入力内容をお確かめの上、しばらく時間をあけて再度お試しください。'
        )
      }

      setFormPostSuccess(true)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormPostFailure(e.message)
      }
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={currentUrl}
        openGraph={{
          type: 'article',
          title: post.title,
          url: currentUrl,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: post.title,
            item: currentUrl,
          },
        ]}
      />

      <PageContainer
        breadcrumbsItems={[{ label: 'Home', href: '/' }, { label: post.title }]}
        title={post.title}
      >
        <LStack space="48px">
          <div
            css={articleStyle}
            dangerouslySetInnerHTML={{ __html: `${post.content}` }}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <LStack space="24px">
              <LStack tag="dl" space="24px">
                <LStack space="8px">
                  <dt>
                    <label htmlFor="contactFormName">お名前</label>
                  </dt>
                  <dd>
                    <input
                      css={textFieldStyle}
                      id="contactFormName"
                      type="text"
                      required
                      {...register('name', { required: true })}
                    />
                  </dd>
                </LStack>
                <LStack space="8px">
                  <dt>
                    <label htmlFor="contactFormEmail">メールアドレス</label>
                  </dt>
                  <dd>
                    <input
                      css={textFieldStyle}
                      id="contactFormEmail"
                      type="text"
                      required
                      {...register('email', {
                        required: true,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                          message: 'メールアドレスの形式が不正です。',
                        },
                      })}
                    />
                  </dd>
                </LStack>
                <LStack space="8px">
                  <dt>
                    <label htmlFor="contactFormContent">お問い合わせ内容</label>
                  </dt>
                  <dd>
                    <textarea
                      css={textFieldStyle}
                      id="contactFormContent"
                      required
                      {...register('content', { required: true })}
                    />
                  </dd>
                </LStack>
              </LStack>

              <LStack space="8px">
                <label css={checkBoxStyle(currentPrivacyInput)}>
                  <input
                    type="checkbox"
                    required
                    {...register('privacy', { required: true })}
                  />
                  プライバシーポリシーに同意する
                </label>
                <p>
                  プライバシーポリシーは
                  <Link href="/privacy" passHref>
                    <a>こちら</a>
                  </Link>
                  からご確認ください。
                </p>
              </LStack>

              <div>
                <AppButton
                  size="medium"
                  type="submit"
                  outlined
                  loading={formLoading}
                >
                  送信する
                </AppButton>
              </div>

              {formPostSuccess && (
                <p css={formPostResponseTextStyle}>
                  お問い合わせを送信しました。内容を確認し、ご連絡させていただきます。
                </p>
              )}

              {!!formPostFailure && (
                <p css={formPostResponseTextStyle}>{formPostFailure}</p>
              )}
            </LStack>
          </form>
        </LStack>
      </PageContainer>
    </>
  )
}
export default Page

// ----------------------------------------
// Style
// ----------------------------------------

const textFieldStyle = css`
  display: block;
  width: 100%;
  padding: 4px 8px;
  font: inherit;
  border: solid 1px currentcolor;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }
`

const checkBoxStyle = (val: boolean) => {
  return css`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &::before {
      grid-area: 1 / 1 / 2 / 2;
      width: 1em;
      height: 1em;
      content: '';
      background-color: ${val ? 'var(--color-primary)' : 'transparent'};
      border: solid 1px currentcolor;
      border-radius: 2px;
    }

    &::after {
      grid-area: 1 / 1 / 2 / 2;
      width: 0.4em;
      height: 0.6em;
      content: '';
      border-right: solid 2px #fff;
      border-bottom: solid 2px #fff;
      opacity: ${val ? 1 : 0};
      transform: rotate(45deg) translateX(0.15em) translateY(-0.2em);
    }

    &:focus-within {
      &::before {
        border-color: var(--color-primary);
      }
    }

    input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
  `
}

const formPostResponseTextStyle = css`
  font-weight: 700;
`
