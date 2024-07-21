import Card from "components/Card";
import Header from "components/Header";
import ProfileContent from "components/ProfileContent";
import React from "react";

export default function Portifolio() {
  return (
    <main className="overflow-hidden h-full dark:text-slate-200 dark:bg-slate-900 transition-theme">
      <Header />
      <section>
        <div className="w-full grid place-items-center">
          <Card>
            <ProfileContent />
          </Card>
        </div>
      </section>
    </main>
  );
}
