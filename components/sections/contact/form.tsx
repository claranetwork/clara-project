"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ActionChild, PrimaryButton, SecondaryButton } from "@/components/elements/button"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  message: z.string().min(1, {
    message: "Message must be at least 1 characters.",
  }),
})

export function ContactForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`Message generated from ${values.name}`);
    const body = encodeURIComponent(`${values.message}`);
    const mailtoLink = `mailto:info@nerzo.xyz?subject=${subject}&body=${body}`;

    const tempLink = document.createElement("a");
    tempLink.href = mailtoLink;
    tempLink.target = "_blank";
    tempLink.rel = "noopener noreferrer";

    toast({
      title: "Email client opened!",
      description: "Please send your message from your email client.",
      variant: "default",
    });

    setTimeout(() => {
      tempLink.click();
    }, 750)

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 pt-4 lg:pt-0 lg:px-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="border-foreground/30 bg-foreground/20 min-h-10 placeholder:text-foreground/80 placeholder:font-khand placeholder:text-[16px] placeholder:uppercase placeholder:mt-[2px] placeholder:tracking-wider" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="pb-2">
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className="resize-none border-foreground/30 outline-none ring-0 shadow-none min-h-[100px] bg-foreground/20 placeholder:text-foreground/80 placeholder:font-khand placeholder:text-[16px] placeholder:uppercase placeholder:mt-[2px] placeholder:tracking-wider"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SecondaryButton type="submit" className="w-max ">
          <ActionChild text="Send" arrowSize="22px" />
        </SecondaryButton>
      </form>
    </Form>
  )
}


