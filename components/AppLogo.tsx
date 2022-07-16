// components > AppLogo

import { css } from '@emotion/react'

// ----------------------------------------
// JSX
// ----------------------------------------

export const AppLogo = () => {
  return (
    <svg
      css={rootStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1134 280"
    >
      <polyline
        css={iconStyle}
        points="136.06 31.99 45.48 84.29 45.48 193.44 140 248.01 234.52 193.44 234.52 122.27 185.15 150.69 136.31 122.5 136.31 66.06 185.72 37.91 217.15 55.21 217.15 74.21 185.67 56.08 152.07 75.22 152.07 113.39 185.16 132.49 250.29 94.99 250.29 202.54 140 266.21 29.71 202.54 29.71 75.19 136.06 13.79"
      />
      <path
        css={textStyle}
        d="M1088.4,174.93h-69c2.74,10.58,11.37,16.46,23.71,16.46,9.22,0,18.43-3.72,23.92-10.19l15.09,15.09c-8.63,11.56-24.7,17.84-40.77,17.84-28,0-48.61-19.21-48.61-47.44,0-29.59,22.35-48,48.61-48,26.07,0,47.43,18.43,47.43,46.46C1088.79,167.67,1088.6,170.81,1088.4,174.93Zm-25.28-16.66c-.79-10.78-9.8-17.25-21.37-17.25-10.38,0-19.6,4.9-22.34,17.25Z"
      />
      <path
        css={textStyle}
        d="M955.32,212.36l-32.14-39.59v39.59H897.5V72.22h25.68v76.64L946.3,121h32.93l-35.67,40.18,43.71,51.15Z"
      />
      <path
        css={textStyle}
        d="M871.63,121v91.33H846V201c-6.47,9-19.21,13.14-29.4,13.14-23.52,0-44.88-18.23-44.88-47.63s21.36-47.63,44.88-47.63c10.59,0,22.93,3.92,29.4,13.13V121ZM845.17,166.5c0-14.11-11.76-23.52-23.72-23.52a23.38,23.38,0,0,0-23.71,23.52,23.72,23.72,0,0,0,47.43,0Z"
      />
      <path
        css={textStyle}
        d="M760.5,140.82H741.09v71.54H715.42V140.82H698.76V121h16.66V87.51h25.67V121H760.5Z"
      />
      <path
        css={textStyle}
        d="M680.73,121v91.33H655.05V201c-6.47,9-19.21,13.14-29.4,13.14-23.52,0-44.88-18.23-44.88-47.63s21.36-47.63,44.88-47.63c10.59,0,22.93,3.92,29.4,13.13V121ZM654.27,166.5c0-14.11-11.76-23.52-23.72-23.52a23.39,23.39,0,0,0-23.72,23.52,23.72,23.72,0,0,0,47.44,0Z"
      />
      <path
        css={textStyle}
        d="M572.34,121.61l-5.88,24.5a26.63,26.63,0,0,0-13.13-3.33c-13.13,0-22.15,12.15-22.15,38.22v31.36H505.51V121H531v19.4c5.09-15.29,15.48-21.76,26.85-21.76C562.74,118.67,568.23,119.46,572.34,121.61Z"
      />
      <path
        css={textStyle}
        d="M454,121h25.68v91.33H454Zm12.58-46.74L453.15,82V97.48l13.39,7.73,13.39-7.73V82Z"
      />
      <path
        css={textStyle}
        d="M424.56,77.32v135H397.32V157.48H347v54.88H319.7v-135H347V133h50.37V77.32Z"
      />
    </svg>
  )
}

// ----------------------------------------
// Style
// ----------------------------------------

const rootStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  color: inherit;
  vertical-align: bottom;
  user-select: none;
`

const iconStyle = css`
  fill: #a83d3d;
`

const textStyle = css`
  color: inherit;
  fill: currentcolor;
`
