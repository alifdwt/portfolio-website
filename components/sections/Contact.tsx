import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Contact() {
  const t = useTranslations();

  return (
    <section id="contact" className="dark bg-contact-footer py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-foreground text-lg mb-8">{t("contact.title")}</p>
          <Link
            href="mailto:aputradewantara@gmail.com"
            className="border-white border-8 inline-block bg-gradient-to-r from-[#dcf2b0] to-[#8df5a3] rounded-full px-8 py-4 lg:px-24 lg:py-8 text-center hover:from-[#8df5a3] hover:to-[#dcf2b0] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-black lg:text-[72px] font-medium select-none">
              {t("contact.cta")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
