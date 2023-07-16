'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from './Button';
type Props = {
  startCursor: string;
  endCursor: string;
  prevPage: boolean;
  nextPage: boolean;
};
const LoadMore = ({ startCursor, endCursor, prevPage, nextPage }: Props) => {
  const router = useRouter();
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === 'next' && nextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'first' && prevPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }
    const newSearchParams = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newSearchParams}`;
    router.push(newPathName);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {prevPage && (
        <Button
          title="First Page"
          handleClick={() => {
            handleNavigation('first');
          }}
        />
      )}
      {nextPage && (
        <Button
          title="Next"
          handleClick={() => {
            handleNavigation('next');
          }}
        />
      )}
    </div>
  );
};

export default LoadMore;
