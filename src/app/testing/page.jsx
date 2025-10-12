"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselDemo() {
  return (
    <div className="max-w-6xl mx-auto flex justify-center py-10">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3" 
            >
              <div className="p-2">
               <div>ts</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Tombol navigasi tidak terlalu di ujung */}
        <CarouselPrevious className="left-2 sm:left-5" />
        <CarouselNext className="right-2 sm:right-5" />
      </Carousel>
    </div>
  )
}
