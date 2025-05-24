
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '../ToastProvider';
import { XIcon } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  async function login() {

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.back();
    } else {
      showToast({ message: 'Invalid email or password', type: 'error' });
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") router.back();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body pt-12">
          <fieldset className="fieldset">

            <label className="label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />
            
            <label className="label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
            <button className="btn btn-neutral mt-4" onClick={login}>Login</button>
            <button className="btn btn-square absolute top-2 right-2" onClick={() => router.back()}><XIcon /></button>

          </fieldset>
        </div>
      </div>
    </div>
  );
}
