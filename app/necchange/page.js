"use client";

import { useState } from "react";
import { Providers } from "../providers";
import MyNavbar from "../components/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import ptLocale from "@fullcalendar/core/locales/pt";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Accordion,
  AccordionItem,
  Checkbox,
  cn,
} from "@nextui-org/react";
import CheckboxTree from "../components/CheckboxTree/CheckboxTree";

export default function Necchange() {
  const views = {
    multiMonthFourMonth: {
      type: "multiMonth",
      duration: { months: 4 },
    },
  };
  const events = [
    {
      id: "a",
      title: "Ola",
      start: "2023-11-17",
      end: "2023-11-17",
    },
  ];

  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const eventClickCallback = (info) => {
    setIsPopUpOpened(!isPopUpOpened);
  };

  const [nodes, setNodes] = useState([
    { value: `eventos`, label: `Eventos`, children: null },
    {
      value: `1ano`,
      label: `1 Ano`,
      children: [
        { value: `1semestre`, label: `1 Semestre`, children: null },
        { value: `2semestre`, label: `2 Semestre`, children: null },
      ],
    },
  ]);
  const [checked, setChecked] = useState([]);

  return (
    <Providers>
      <main className="gradient-bg h-screen flex flex-col">
        <MyNavbar />
        <div className="grid grid-cols-4 h-full">
          <div className="p-5 bg-white/80 dark:bg-black/80">
            <CheckboxTree
              nodes={nodes}
              checked={checked}
              onCheck={(checked) => setChecked(checked)}
            />
          </div>
          <div className="flex items-center justify-center h-full col-span-3">
            <Card className="w-2/3">
              <CardBody>
                <FullCalendar
                  plugins={[dayGridPlugin, multiMonthPlugin]}
                  locale={ptLocale}
                  eventClick={eventClickCallback}
                  // initialView="multiMonthFourMonth"
                  initialView="dayGridMonth"
                  views={views}
                  events={events}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </Providers>
  );
}
