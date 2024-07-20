import Card from "components/Card";
import Header from "components/Header";
import React, { useState } from "react";

export default function Portifolio() {
  const [profileName] = useState("eduardonagashima");

  // const debounceSetProfile = useCallback(
  //   setTimeout(() => {
  //     setProfileName(profileName);
  //   }, 3000),
  //   [],
  // );

  // const onChangeName = (e) => {
  //   debounceSetProfile(e.target.value);
  // };

  return (
    <main className="overflow-hidden h-full dark:text-slate-200 dark:bg-slate-900 transition-theme">
      <Header />
      <section>
        <div>
          {/* <input
            className="dark:bg-gray-200 bg-blue-900 dark:text-gray-500 text-gray-100 w-3/4 p-2 rounded"
            type="text"
            onChange={onChangeName}
          /> */}
          <Card profileName={profileName} />
        </div>
      </section>
    </main>
  );
}
