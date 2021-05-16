import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback : Function) : [boolean, Function]=> {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      if (!isFetching) return;
      callback();
    }, [isFetching]);
  
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      setIsFetching(true);
    }
  
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;