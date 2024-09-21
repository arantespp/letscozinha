import { SocialNav } from 'src/components/SocialNav';

export default async function Contact() {
  return (
    <div className="">
      <h1>Contato</h1>
      <p>
        Se você tiver alguma dúvida, sugestão ou quiser falar conosco, entre em
        contato pelos nossos canais de comunicação.
      </p>
      <SocialNav
        className="flex flex-col gap-md mt-lg"
        linkClassName="flex items-center gap-sm no-underline"
        iconClassName="text-2xl"
      />
    </div>
  );
}
