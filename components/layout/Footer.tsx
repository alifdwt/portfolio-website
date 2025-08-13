import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  const footerSections = [
    {
      title: "",
      links: [
        { name: t("footer.links.home"), href: "#home" },
        { name: t("footer.links.aboutMe"), href: "#about" },
        { name: t("footer.links.myServices"), href: "#services" },
      ],
    },
    {
      title: "",
      links: [
        { name: t("footer.links.recentProject"), href: "#portfolio" },
        { name: t("footer.links.faqs"), href: "#faq" },
        { name: t("footer.links.page404"), href: "#404" },
      ],
    },
    {
      title: "",
      links: [
        { name: t("footer.links.styleGuide"), href: "#style" },
        { name: t("footer.links.changelog"), href: "#changelog" },
        { name: t("footer.links.license"), href: "#license" },
      ],
    },
  ];

  const socialLinks = [
    { name: t("footer.social.behance"), href: "https://behance.net/alifdwt" },
    { name: t("footer.social.dribbble"), href: "https://dribbble.com/alifdwt" },
    {
      name: t("footer.social.linkedin"),
      href: "https://linkedin.com/in/alifdwt",
    },
  ];

  return (
    <footer className="bg-contact-footer">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-12 md:grid-cols-5">
          {/* Left side - 3 columns for links */}
          <div className="grid grid-cols-1 gap-8 md:col-span-3 md:grid-cols-3">
            {footerSections.map((section, index) => (
              <div key={index}>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right side - Social links and contact */}
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-6 md:items-end">
              {/* Social Links */}
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="text-right">
                <p className="mb-2 text-gray-400">
                  {t("footer.contact.email")}
                </p>
                <p className="text-gray-400">{t("footer.contact.phone")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <div className="mb-4 flex items-center space-x-8 md:mb-0">
            <p className="text-sm text-gray-400">{t("footer.copyright")}</p>
            <p className="text-sm text-gray-400">{t("footer.designedBy")}</p>
          </div>
          <p className="text-sm text-gray-400">{t("footer.poweredBy")}</p>
        </div>
      </div>
    </footer>
  );
}
