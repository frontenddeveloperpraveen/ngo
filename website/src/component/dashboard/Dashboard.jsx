import Slider from "./Slider";
import { Copy, Share } from "lucide-react";
import BarChart from "./Barchart";

const Dashboard = ({
  whatsappmsg,
  Copy2Clipboard,
  donationNumber,
  totaldonation,
  referal,
  user,
  graph,
}) => {
  return (
    <main>
      <nav className="flex justify-between px-4 mt-2 items-center">
        <span className="text-lg font-semibold tracking-wide">
          <h1>Dashboard</h1>
        </span>
        <span>
          <h1 className="text-[13px]">Home / Dashboard</h1>
        </span>
      </nav>
      <div className="px-4 mt-3 h-[84vh] overflow-auto">
        <Slider />
        <div>
          <h1 className="text-center font-semibold mt-8 text-3xl tracking-wide">
            Hello, {user ? user.firstName : "User"}
          </h1>
          <h1 className="text-center tracking-wider mt-2">
            Here is your report
          </h1>
          <section className="mt-10 flex">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div id="goal" className="text-center border p-5 rounded-full ">
                <h1 className="text-md font-bold">Goal Achieved</h1>
                <h1 className="text-lg">{donationNumber}</h1>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div id="goal" className="text-center border p-5 rounded-full ">
                <h1 className="text-md font-bold">Total Money Raised</h1>
                <h1 className="text-lg" id="totaldonation-amount">
                  ₹ <span>{totaldonation}</span>
                </h1>
              </div>
            </div>
          </section>
          <section className="flex justify-center items-center">
            <div className="mt-8">
              <h1 id="reference-code-link">
                <span className="font-semibold tracking-wide">
                  Reference Code :
                </span>
                <span> {referal}</span>
              </h1>
              <button
                className="flex justify-center my-5 items-center border border-black p-3 bg rounded-md bg-green-400 hover:bg-green-500 gap-2"
                onClick={Copy2Clipboard}
                id="copytoclipboard"
              >
                <Copy /> <h1>Copy Donation Link</h1>
              </button>
              <a href={whatsappmsg} target="_blank">
                <button className="flex justify-center my-5 items-center border border-black p-3 bg rounded-md bg-green-400 hover:bg-green-500 gap-2">
                  <Share />
                  Share on Whatsapp
                </button>
              </a>
            </div>
          </section>
          <section
            id="graphs"
            className="flex justify-center items-center my-10"
          >
            <main className="w-3/4">
              <BarChart graph={graph} />
            </main>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
