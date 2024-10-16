import React from "react";

const Transaction = ({ transactions }) => {
  return (
    <main>
      <nav className="flex justify-between px-4 mt-2 items-center">
        <span className="text-lg font-semibold tracking-wide">
          <h1>Transaction</h1>
        </span>
        <span>
          <h1 className="text-[13px]">Home / Transaction</h1>
        </span>
      </nav>
      <section className="px-6 ">
        {transactions.length === 0 ? (
          <section className="py-6 mt-2 flex justify-center items-center h-[80vh] ">
            <h1 className="text-center font-bold">No Donation Yet</h1>
          </section>
        ) : (
          <section className="py-6 mt-2 overflow-auto h-[80vh] ">
            <table className="min-w-full mt-6 ">
              <thead className="border">
                <tr>
                  <th className="px-4 py-2 text-center">S.No</th>{" "}
                  {/* Serial Number */}
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2 text-center">Amount</th>
                  <th className="px-4 py-2 text-center">Transaction ID</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2 text-center">Pancard</th>
                </tr>
              </thead>
              <tbody className="border">
                {transactions.map((transaction, index) => (
                  <tr key={index + 1}>
                    <td className="px-4 py-2 text-center">{index + 1}</td>{" "}
                    <td className="px-4 py-2 text-center">
                      {transaction.fullName}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction.donation}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction.transactionId}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction.Pancard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </section>
    </main>
  );
};

export default Transaction;
