import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
type Props = {
  title: string;
  type?: 'button' | 'submit';
  leftIcon: string;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
  rightIcon?: string;
};
const Button = ({
  title,
  type,
  leftIcon,
  isSubmitting,
  bgColor,
  textColor,
  handleClick,
  rightIcon,
}: Props) => {
  return (
    <button
      type="button"
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 
        ${textColor || 'text-white'}
        ${
          isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
        } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
