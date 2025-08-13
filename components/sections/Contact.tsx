import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();

  return (
    <section id="contact" className="dark bg-contact-footer py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-8 text-lg text-foreground">{t("contact.title")}</p>
          <Link
            href="mailto:aputradewantara@gmail.com"
            className="inline-block transform rounded-full border-8 border-white bg-gradient-to-r from-[#dcf2b0] to-[#8df5a3] px-8 py-4 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#8df5a3] hover:to-[#dcf2b0] hover:shadow-xl lg:px-24 lg:py-8"
          >
            <span className="font-medium text-black select-none lg:text-[72px]">
              {t("contact.cta")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
