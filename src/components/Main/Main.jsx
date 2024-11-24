import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
// import { LuFileEdit } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import Swal from "sweetalert2";

const Main = () => {
  const [getStarted, setGetStarted] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const handleInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const contact = { name, email, number };
    if (editingContact !== null) {
      setContacts((prevContacts) =>
        prevContacts.map((item, index) =>
          index === editingContact ? contact : item
        )
      );
      setEditingContact(null);
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
    document.getElementById("my_modal_3").close();
  };

  const handleDelete = (singleContact) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newContacts = contacts.filter(
            (contact) =>
              contact.name !== singleContact.name ||
              contact.email !== singleContact.email ||
              contact.number !== singleContact.number
          );
          setContacts(newContacts);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your information has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Information was not deleted :)",
            icon: "error",
          });
        }
      });
  };

  // const handleEdit = (index) => {
  //   if (index >= 0 && index < contacts.length) {
  //     const contact = contacts[index];
  //     setEditingContact(index);
  //     document.getElementById("name").value = contact.name;
  //     document.getElementById("email").value = contact.email;
  //     document.getElementById("number").value = contact.number;
  //     document.getElementById("my_modal_3").showModal();
  //   } else {
  //     console.error("Invalid index for editing contact:", index);
  //   }
  // };

  const generatevcf = () => {
    const vcfData = contacts
      .map((contact) => {
        const formattedNumber = contact.number.replace(/[^0-9+]/g, "");
        return `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${formattedNumber}
EMAIL:${contact.email}
END:VCARD`;
      })
      .join("\n");

    const blob = new Blob([vcfData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contacts.vcf";
    link.click();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your VCF file has been created and downloaded",
      showConfirmButton: false,
      timer: 1500,
    });
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
            <table className="table-auto border-collapse rounded-2xl border-red-500 w-full">
              <thead>
                <tr>
                  <th className="bg-red-500 py-3 px-3 rounded-tl-2xl text-xs sm:text-base">
                    Index
                  </th>
                  <th className="bg-red-500 py-3 px-5 sm:px-32 border-l border-l-slate-950 text-xs sm:text-base">
                    Name
                  </th>
                  <th className="bg-red-500 py-3 px-5 sm:px-32 border-l border-l-slate-950 text-xs sm:text-base">
                    Email Address
                  </th>
                  <th className="bg-red-500 py-3 px-5 sm:px-32 border-l border-l-slate-950 text-xs sm:text-base">
                    Phone
                  </th>
                  <th className="bg-red-500 py-3 px-3 rounded-tr-2xl border-l border-l-slate-950 text-xs sm:text-base">
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
                    <td className="justify-evenly py-2 flex space-x-2">
                      <button
                        onClick={() => handleDelete(contact)}
                        className="hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 rounded-md p-2 flex justify-center items-center"
                      >
                        <MdDeleteForever />
                      </button>
                      {/* <button
                onClick={() => handleEdit(index)}
                className="hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 rounded-md p-2 flex justify-center items-center"
              >
                <LuFileEdit />
              </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:flex md:flex-row grid grid-cols-3  mt-5 space-y-5 sm:space-y-0 sm:space-x-5">
            <div className="w-full">
              <button
                onClick={generatevcf}
                className="w-full bg-red-500 hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
              >
                Confirm & Download
              </button>
            </div>
            <div className="w-full">
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
                <div className="modal-box bg-slate-950 border border-red-500 max-w-lg mx-auto">
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
                      className="bg-slate-950 border-b border-red-500 outline-none w-full"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-slate-950 border-b border-red-500 outline-none w-full"
                    />
                    <input
                      required
                      type="text"
                      name="number"
                      placeholder="Phone number"
                      className="bg-slate-950 border-b border-red-500 outline-none w-full"
                    />

                    <input
                      type="submit"
                      value="Submit"
                      className="bg-red-500 w-full sm:w-1/3 mt-7 hover:scale-110 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
                    />
                  </form>
                </div>
              </dialog>
            </div>

            <div className="w-full">
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setContacts([]);
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                      });
                    }
                  });
                }}
                className="w-full bg-red-500 hover:scale-105 border-red-500 border-2 hover:text-red-500 hover:font-normal ease-in-out hover:bg-white transform duration-300 mx-auto rounded-md p-3 flex justify-center items-center"
              >
                <TiCancel className="mr-2 scale-150" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
