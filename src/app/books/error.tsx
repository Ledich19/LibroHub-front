'use client';

import React from 'react';

export default function ErrorBooks({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <div>
      <h2>Произошла ошибка</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
