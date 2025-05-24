import Login from "@/components/ui/Login";

export default function Page() {
  return (
    <dialog id="my_login_modal" className="modal" open>
      {/* <div className="modal-box">
  </div>
   */}
      <Login />
    </dialog>
  )
}