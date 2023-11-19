"use client";

import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import MyNavbar from "./components/Navbar";
import { Providers } from "./providers";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Providers>
        <main className="gradient-bg h-screen flex flex-col">
          <MyNavbar />
          <Image
            alt="Relaxing app background"
            className="fixed z-0 w-full h-full object-cover"
            width="1920"
            height="1080"
            src="/lines.svg"
          />
          <div className="grid grid-cols-2 my-auto">
            <div className="flex items-center justify-center">
              <Card isFooterBlurred className="w-full h-[400px] w-[400px]">
                <Image
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  width="500"
                  height="500"
                  src="/images/card-example-5.png"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Notify Me
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="flex flex-col w-1/2">
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-tiny text-black/60 dark:text-white/60 uppercase font-bold">
                          What to watch
                        </p>
                        <h4 className="text-black dark:text-white font-medium text-large">
                          Acede a tua conta
                        </h4>
                      </div>
                      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="email"
                          label="Email"
                          labelPlacement="outside"
                          placeholder="Enter your email"
                        />
                      </div>
                      <Button color="primary">Sign In</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </Providers>
    </>
  );
}
