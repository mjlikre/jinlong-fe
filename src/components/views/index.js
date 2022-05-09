import React, { useMemo } from "react";
import * as R from "ramda";

import SalesTable from "../sales/salesTable";
import PurchaseTable from "../purchases/purchaseTable";
import Card from "./card";
import { generic } from "../../lib/language";

const View = ({
  name,
  phone,
  date,
  email,
  tableElem,
  client,
  children,
  lang,
}) => {
  const amount = useMemo(
    () => R.reduce((acc, item) => R.add(acc, item.amount), 0, tableElem),
    [tableElem]
  );

  return (
    <div className="flex w-full justify-around pt-10">
      <div className="w-3/12">
        <Card
          name={name}
          phone={phone}
          date={date}
          email={email}
          amount={amount}
          lang={lang}
          className="mb-8 mx-auto w-full"
          client
        />
      </div>
      <div className="w-8/12">
        {client ? (
          <>
            <p className="text-xl">{generic.clientHist[lang]}</p>
            <SalesTable sales={tableElem} lang={lang} />
          </>
        ) : (
          <>
            <p className="text-xl">{generic.providerHist[lang]}</p>
            <PurchaseTable items={tableElem} lang={lang} />
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default View;
