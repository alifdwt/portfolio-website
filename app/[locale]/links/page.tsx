import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LinksPage from "@/components/pages/LinksPage";

export async function generateMetadata(): Promise<Metadata> {
  //   const { locale } = await params;
  const t = await getTranslations("links");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      images: [
        {
          url: "https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no",
          width: 288,
          height: 288,
          alt: "Alif Dewantara",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: t("metadata.title"),
      description: t("metadata.description"),
      images: [
        "https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no",
      ],
    },
  };
}

export default function Page() {
  return <LinksPage />;
}
