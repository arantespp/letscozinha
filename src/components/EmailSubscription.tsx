'use client';

import * as React from 'react';

type EmailSubscriptionProps = {
  /** Title to display above the subscription form */
  title: string;
  /** Description to display below the title */
  description: string;
  /** Custom container classes */
  containerClassName?: string;
  /** Layout direction for the form (column or row) */
  formLayout?: 'row' | 'column';
  /** Text alignment for the heading and description */
  textAlignment?: 'center' | 'left';
  /** Additional margin classes for responsive spacing */
  marginClassName?: string;
};

/**
 * Unified component for email subscription using the API
 */
export function EmailSubscription({
  title,
  description,
  containerClassName = 'bg-gradient-to-br from-primary/10 to-accent/10 p-md rounded-lg shadow-sm',
  formLayout = 'column',
  textAlignment = 'left',
  marginClassName = 'my-md md:my-lg',
}: EmailSubscriptionProps) {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Using our own API endpoint that validates the origin and forwards to Listmonk
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(
          data.error || 'Houve um erro ao processar sua inscrição.'
        );
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'Houve um problema de conexão. Por favor, tente novamente mais tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const textAlignmentClass =
    textAlignment === 'center' ? 'text-center' : 'text-left';
  // Always start with flex-col, apply sm:flex-row only if formLayout is 'row'
  const formLayoutClass =
    formLayout === 'row' ? 'flex-col sm:flex-row' : 'flex-col';

  return (
    <div className={`${containerClassName} ${marginClassName}`}>
      <h3 className={`font-heading text-lg mb-sm ${textAlignmentClass}`}>
        {title}
      </h3>
      <p className={`text-sm text-text-light mb-md ${textAlignmentClass}`}>
        {description}
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`flex ${formLayoutClass} gap-xs w-full`}
      >
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-md py-sm border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-text-dark px-md py-sm rounded-md font-medium transition-colors whitespace-nowrap"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Inscrevendo...' : 'Inscrever'}
        </button>
      </form>

      {status === 'success' && (
        <p className={`text-green-600 text-sm mt-xs ${textAlignmentClass}`}>
          Obrigado por se inscrever! Você receberá novidades e receitas
          diretamente no seu e-mail.
        </p>
      )}
      {status === 'error' && (
        <p className={`text-red-600 text-sm mt-xs ${textAlignmentClass}`}>
          {errorMessage ||
            'Houve um erro. Por favor, tente novamente mais tarde.'}
        </p>
      )}
    </div>
  );
}
