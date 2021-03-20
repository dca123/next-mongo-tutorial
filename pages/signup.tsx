import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useUser } from '../lib/hooks';

export default function SignupPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState(``);

  async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/login`, {
      method: `POST`,
    });

    if (res.status === 201) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push(`/`);
  }, [user]);

  return (
    <>
      <h1>Sign up to Example</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="submit">
            <a href="/api/login">Login with steam</a>
          </div>
        </form>
      </div>
    </>
  );
}
