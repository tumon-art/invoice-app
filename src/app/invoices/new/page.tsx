"use client";
import { addInvoice } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

function Submit() {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending} type="submit" className="font-semibold">
      {" "}
      {status.pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Submit"
      )}{" "}
    </Button>
  );
}
export default function Home() {
  return (
    <main
      className=" mt-10 flex flex-col 
      justify-center gap-5 text-center"
    >
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoic App</h1>
      </div>

      <div className=" flex justify-between ">
        <form
          action={addInvoice}
          className=" w-full md:w-3/5 flex flex-col gap-3"
        >
          <div className=" text-left">
            <Label htmlFor="name" className="font-semibold text-sm block mb-2">
              Name
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div className=" text-left">
            <Label htmlFor="email" className="font-semibold text-sm block mb-2">
              Email
            </Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className=" text-left">
            <Label htmlFor="value" className="font-semibold text-sm block mb-2">
              Value
            </Label>
            <Input id="value" name="value" type="number" />
          </div>
          <div className=" text-left">
            <Label
              htmlFor="description"
              className="font-semibold text-sm block mb-2"
            >
              Description
            </Label>
            <Textarea id="description" name="description"></Textarea>
          </div>
          <Submit />
        </form>

        <div className=" hidden md:flex opacity-50 justify-center items-center w-full">
          <svg
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.001 512.001"
            fill="#1a5fb4"
            stroke="#1a5fb4"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#10bafc"
                d="M332.803,10.449H95.726c-22.275,0-40.334,18.06-40.334,40.335v410.434 c0,22.276,18.059,40.334,40.334,40.334h320.546c22.275,0,40.334-18.059,40.334-40.334V134.253L332.803,10.449z"
              ></path>{" "}
              <path
                fill="#0084ff"
                d="M373.139,134.253h83.467L332.806,10.451v83.47C332.803,116.195,350.861,134.253,373.139,134.253z"
              ></path>{" "}
              <path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434 c0,28.001,22.781,50.783,50.783,50.783h320.546c28.002,0,50.783-22.781,50.783-50.783V134.253 C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753 c-5.643-5.643-8.752-13.148-8.751-21.131L343.255,35.679L343.255,35.679z M416.274,491.102H95.726 c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021 c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018v316.515 C446.158,477.696,432.752,491.102,416.274,491.102z"></path>{" "}
              <path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678 c5.77,0,10.449-4.678,10.449-10.449C285.541,356.17,280.862,351.492,275.092,351.492z"></path>{" "}
              <path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449H236.61 c5.77,0,10.449-4.678,10.449-10.449C247.059,356.17,242.381,351.492,236.61,351.492z"></path>{" "}
              <path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763 c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"></path>{" "}
              <path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h241.763 c5.77,0,10.449-4.678,10.449-10.449S382.652,256,376.882,256z"></path>{" "}
              <path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h241.763 c5.77,0,10.449-4.678,10.449-10.449C387.331,212.933,382.652,208.255,376.882,208.255z"></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </main>
  );
}
