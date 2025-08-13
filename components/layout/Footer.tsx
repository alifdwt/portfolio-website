import { useTranslations } from "next-intl";
import Link from "next/link";

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-white/10 pt-12">
          {/* Left side - 3 columns for links */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
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
            <div className="flex flex-col md:items-end space-y-6">
              {/* Social Links */}
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="text-right">
                <p className="text-gray-400 mb-2">
                  {t("footer.contact.email")}
                </p>
                <p className="text-gray-400">{t("footer.contact.phone")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
            <p className="text-gray-400 text-sm">{t("footer.designedBy")}</p>
          </div>
          <p className="text-gray-400 text-sm">{t("footer.poweredBy")}</p>
        </div>
      </div>
    </footer>
  );
}
