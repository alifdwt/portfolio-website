import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const ProfileImage = () => {
  const t = useTranslations("about");
  return (
    <div className="relative w-full">
      <div className="relative h-[400px] overflow-hidden rounded-2xl lg:h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-purple-600/90">
          <Image
            src="/images/profile/profile-podcast.jpg"
            alt="Alif Dewantara Profile"
            fill
            className="object-cover mix-blend-overlay"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-md text-white">
            <p className="mb-2 text-sm font-medium opacity-90">
              {t("profileImage.selfIntroduction")}
            </p>
            <h3 className="mb-6 text-3xl leading-tight font-bold lg:text-4xl">
              {t("profileImage.subtitle")}
            </h3>
          </div>

          {/* Play Button */}
          <div className="absolute right-8 bottom-8">
            <button className="flex items-center space-x-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl">
              <span>{t("profileImage.playButton")}</span>
              <div className="flex h-4 w-4 items-center justify-center">
                <svg
                  className="ml-1 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5v10l8-5-8-5z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
