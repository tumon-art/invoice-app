
export default function Home() {
  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoic App</h1>
      </div>

      <form>

        <div>
          <label>
            Name
            <input type="text" />
          </label>

        </div>
        <div>
          <label>
            Email
            <input type="email" />
          </label>

        </div>
        <div>
          <label>
            Value
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea>
            </textarea>
          </label>
        </div>
      </form>
    </main >
  );
}
