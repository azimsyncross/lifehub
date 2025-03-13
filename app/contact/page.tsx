"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Contact Person",
      content: "Amaury Rodriguez",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "UriahKent9888@hotmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+1 8459315154",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      content: (
        <>
          LifeHub LLC
          <br />
          932 E 232nd St
          <br />
          Bronx, NY 10466
          <br />
          USA
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-serif font-light text-gray-900">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-600">
                Let&apos;s start a conversation - we &apos;re here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-green-50 border-green-500 text-green-700 animate-fade-in">
                  <AlertDescription>
                    Message sent successfully! We&apos;ll respond within 24
                    hours.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    className="rounded-lg h-12 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-lg h-12 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    placeholder="How can we help?"
                    className="rounded-lg h-12 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    rows={5}
                    placeholder="Your message..."
                    className="rounded-lg focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-lg font-medium transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
