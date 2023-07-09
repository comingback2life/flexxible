'use client';

import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';
type Provider = {
  id: number;
  name: string;
  type: string;
  signinUrl: string;
  callBackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};
type Providers = Record<string, Provider>;
const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button key={i} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  return <div>AuthProviders</div>;
};

export default AuthProviders;
