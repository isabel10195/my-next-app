import React from "react";

interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
  [key: string]: any;
}

export const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill={fill}
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const PauseCircleIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M11.9688 2C6.44875 2 1.96875 6.48 1.96875 12C1.96875 17.52 6.44875 22 11.9688 22C17.4888 22 21.9688 17.52 21.9688 12C21.9688 6.48 17.4988 2 11.9688 2ZM10.7188 15.03C10.7188 15.51 10.5188 15.7 10.0087 15.7H8.70875C8.19875 15.7 7.99875 15.51 7.99875 15.03V8.97C7.99875 8.49 8.19875 8.3 8.70875 8.3H9.99875C10.5087 8.3 10.7087 8.49 10.7087 8.97V15.03H10.7188ZM15.9987 15.03C15.9987 15.51 15.7987 15.7 15.2887 15.7H13.9987C13.4887 15.7 13.2887 15.51 13.2887 15.03V8.97C13.2887 8.49 13.4887 8.3 13.9987 8.3H15.2887C15.7987 8.3 15.9987 8.49 15.9987 8.97V15.03Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const NextIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
        fill="currentColor"
      />
      <path
        d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PreviousIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M20.2409 7.21957V16.7896C20.2409 18.7496 18.1109 19.9796 16.4109 18.9996L12.2609 16.6096L8.11094 14.2096C6.41094 13.2296 6.41094 10.7796 8.11094 9.79957L12.2609 7.39957L16.4109 5.00957C18.1109 4.02957 20.2409 5.24957 20.2409 7.21957Z"
        fill="currentColor"
      />
      <path
        d="M3.76172 18.9303C3.35172 18.9303 3.01172 18.5903 3.01172 18.1803V5.82031C3.01172 5.41031 3.35172 5.07031 3.76172 5.07031C4.17172 5.07031 4.51172 5.41031 4.51172 5.82031V18.1803C4.51172 18.5903 4.17172 18.9303 3.76172 18.9303Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RepeatOneIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M3.91 17.1814C3.72 17.1814 3.53 17.1114 3.38 16.9614C2.01 15.5814 1.25 13.7614 1.25 11.8314C1.25 7.82139 4.5 4.56139 8.5 4.56139L14.57 4.58139L13.48 3.54139C13.18 3.25139 13.17 2.78139 13.46 2.48139C13.75 2.18139 14.22 2.17139 14.52 2.46139L16.96 4.80139C17.18 5.01139 17.25 5.34139 17.14 5.62139C17.03 5.90139 16.75 6.09139 16.44 6.09139L8.5 6.07139C5.33 6.07139 2.75 8.66139 2.75 11.8414C2.75 13.3714 3.35 14.8214 4.44 15.9114C4.73 16.2014 4.73 16.6814 4.44 16.9714C4.29 17.1114 4.1 17.1814 3.91 17.1814Z"
        fill="currentColor"
      />
      <path
        d="M9.9999 21.75C9.8099 21.75 9.6299 21.68 9.4799 21.54L7.0399 19.2C6.8199 18.99 6.7499 18.66 6.8599 18.38C6.9799 18.1 7.2599 17.95 7.5599 17.91L15.5099 17.93C18.6799 17.93 21.2599 15.34 21.2599 12.16C21.2599 10.63 20.6599 9.18 19.5699 8.09003C19.2799 7.80003 19.2599 7.32003 19.5499 7.03003C19.8399 6.74003 20.3199 6.72003 20.6099 7.01003C22.1499 8.68003 23.0099 10.9100 23.0099 13.0100C23.0099 16.3200 21.0299 19.2200 17.8799 20.2800C15.6199 21.2800 12.9199 21.7500 9.9999 21.7500Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShuffleIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M20.79 3.20998L17.61 6.38998C16.81 7.18998 15.21 7.18998 14.41 6.38998L13 4.97998L17.59 0.37998C17.99 0.08998 18.64 0.08998 18.94 0.47998L20.79 3.20998ZM3.20999 20.79L6.38999 17.61C7.18999 16.81 7.18999 15.21 6.38999 14.41L4.97999 13L0.37999 17.59C0.08999 17.99 0.08999 18.64 0.47999 18.94L3.20999 20.79ZM5.15999 10.49C5.57999 10.49 5.88999 10.79 5.88999 11.21C5.88999 11.63 5.57999 11.93 5.15999 11.93C4.73999 11.93 4.42999 11.63 4.42999 11.21C4.42999 10.79 4.73999 10.49 5.15999 10.49ZM18.8399 10.49C19.2599 10.49 19.5699 10.79 19.5699 11.21C19.5699 11.63 19.2599 11.93 18.8399 11.93C18.4199 11.93 18.1099 11.63 18.1099 11.21C18.1099 10.79 18.4199 10.49 18.8399 10.49Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PlayCircleIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22ZM10 16.5V7.5L15 12L10 16.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
