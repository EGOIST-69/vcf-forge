import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const Main = () => {
  const [getStarted, setGetStarted] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const contact = { name, email, number };
    setContacts((prevContacts) => [...prevContacts, contact]);
    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!getStarted && (
        <div className="greetings-section text-center">
          <h1 className="text-5xl font-bold">Welcome to VCF Forge</h1>
          <p className="py-6">
            Convert your Information to VCF file in one click
          </p>
          <button
            onClick={() => setGetStarted(true)}
            className="bg-red-500 hover:scale-110 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
          >
            Get Started <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}

      {getStarted && (
        <div>
          <div>
            <table className="table-auto border-collapse border  border-red-500 w-full">
              <thead className="rounded-2xl">
                <tr>
                  <th className="bg-red-500 py-3 px-3 rounded-tl-2xl">Index</th>
                  <th className="bg-red-500 py-3 px-32 border-l border-l-slate-950">
                    Name
                  </th>
                  <th className="bg-red-500 py-3 px-32 border-l border-l-slate-950">
                    Email Address
                  </th>
                  <th className="bg-red-500 py-3 px-32 border-l border-l-slate-950">
                    Phone
                  </th>
                  <th className="bg-red-500 py-3 px-10 rounded-tr-2xl border-l border-l-slate-950">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-2xl">
                {contacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="border-b rounded-2xl border-red-500"
                  >
                    <td className="text-center py-2">{index + 1}</td>
                    <td className="text-center py-2">{contact.name}</td>
                    <td className="text-center py-2">{contact.email}</td>
                    <td className="text-center py-2">{contact.number}</td>
                    <td className="text-center py-2">
                      <button className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-5 space-x-5">
            <div className="w-1/2">
              <button className="w-full bg-red-500 hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center">
                Confirm & Download
              </button>
            </div>
            <div className="w-1/2">
              <button
                className="bg-red-500 w-full hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <IoIosAdd className="mr-1 scale-150" />
                Add
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-slate-950 border border-red-500">
                  <form method="dialog">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("my_modal_3").close()
                      }
                      className="text-red-500 hover:border hover:border-red-500 bg-slate-950 btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-red-500 text-2xl">
                    Information
                  </h3>
                  <br />
                  <hr className="border-red-500" />
                  <br />
                  <form
                    onSubmit={handleInfo}
                    method="dialog"
                    className="py-4 grid gap-y-3"
                  >
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="bg-slate-950 border-b border-red-500 outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-slate-950 border-b border-red-500 outline-none"
                    />
                    <input
                      required
                      type="text"
                      name="number"
                      placeholder="Phone number"
                      className="bg-slate-950 border-b border-red-500 outline-none"
                    />

                    <input
                      type="submit"
                      value="Submit"
                      className="bg-red-500 w-1/3 mt-7 hover:scale-110 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
                    />
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
