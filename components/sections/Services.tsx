// "use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface Service {
  number: string;
  title: string;
  tags: string[];
  description: string;
  details: string;
  image?: string;
}

export default function Services() {
  const t = useTranslations("services");

  // Get services data from translations
  const services: Service[] = t.raw("services");

  return (
    <section
      className="relative min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 grid grid-cols-12 gap-8">
          {/* Left Column (4/12) - Badge */}
          <div className="col-span-12 lg:col-span-4">
            <span className="inline-flex items-center rounded-full border border-primary bg-white px-3 py-1 text-sm font-medium text-gray-700">
              <span className="mr-2 text-xl text-primary">✦</span> {t("badge")}
            </span>
          </div>

          {/* Right Column (8/12) - Title */}
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-right text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-6xl">
              {t("title").split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-muted-foreground">
                {t("title").split(" ").slice(-3).join(" ")}
              </span>
            </h2>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          <Accordion type="single" collapsible className="w-full">
            {services.map((service, index) => (
              <AccordionItem
                key={service.number}
                value={`service-${index}`}
                className="border-0 shadow-none"
              >
                <div className="group border-b border-gray-200 bg-white py-8 transition-all duration-300 hover:bg-gray-50">
                  {/* Service Header */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-1 gap-4">
                      {/* Number */}
                      <span className="mt-1 text-lg font-medium text-gray-400">
                        {service.number}
                      </span>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Title and Tags Row */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <h3 className="text-2xl font-medium text-gray-900 lg:text-3xl">
                            {service.title}
                          </h3>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="rounded-full border-gray-300 px-3 py-1 text-xs text-gray-600"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="leading-relaxed text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Accordion Trigger */}
                    <AccordionTrigger className="ml-4 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-primary data-[state=open]:bg-primary data-[state=open]:text-white">
                      <span className="hidden sm:inline">
                        <span className="data-[state=open]:hidden">
                          {t("viewDetails")}
                        </span>
                      </span>
                    </AccordionTrigger>
                  </div>

                  {/* Expandable Content */}
                  <AccordionContent className="mt-6 ml-8 space-y-4 border-t border-gray-100 pt-6">
                    {service.image && (
                      <div className="overflow-hidden rounded-xl">
                        <Image
                          src={service.image}
                          alt={`${service.title} showcase`}
                          width={1200}
                          height={400}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="prose prose-gray max-w-none">
                      <p className="leading-relaxed text-gray-600">
                        {service.details}
                      </p>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
