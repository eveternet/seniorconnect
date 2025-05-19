import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const { user, isLoaded } = useUser();
  const [interestGroupName, setInterestGroupName] = useState("");
  const [interestGroupDescription, setInterestGroupDescription] = useState("");
  const navigate = useNavigate();

  function createInterestGroup() {
    let request_message = {
      user_id: user.id,
      name: interestGroupName,
      description: interestGroupDescription,
    };
    // Todo: ping backend with info when backend is built
  }

  const interest_groups = [
    {
      name: "Chess",
      description:
        "Play a fun game that keeps your brain sharp. Learn new moves!",
    },
    {
      name: "Checkers",
      description:
        "A classic game! Easy to learn, fun to play. Use your thinking.",
    },
    {
      name: "Mahjong",
      description:
        "Play with tiles! A classic game from far away. Good for your mind and friends.",
    },
    {
      name: "Poker",
      description:
        "Play cards together! A fun game. Use your quick thinking. Just for fun!",
    },
    {
      name: "Yoga",
      description: "Gentle moves to feel good. Helps you bend and feel calm.",
    },
    {
      name: "Photography",
      description:
        "Take pictures! Use your camera or phone. Show what you see.",
    },
  ];
  return (
    <>
      {/* Big screen images */}
      <div className="h-screen">
        <div
          className="flex h-1/2 w-screen flex-col"
          style={{
            backgroundImage:
              "url(https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWIAtf6GHm5lrZ98QWs3u0VtEUe4CPfDKG7J1i)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="relative top-1/4 left-15 w-10/12 text-5xl font-extrabold text-blue-100">
            Join your favourite interest groups!
          </h1>
          <button className="relative right-15 bottom-5 mt-auto ml-auto rounded-2xl border-blue-950 bg-blue-200 p-5 text-blue-900 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-100">
            Join Now!
          </button>
        </div>

        <div
          className="flex h-1/2 w-screen flex-col"
          style={{
            backgroundImage:
              "url(https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWVRaXM6IHEwDAyduGvTsCFRr4lUZ62eagxmk3)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="relative top-2/8 left-15 w-10/12 text-5xl font-extrabold text-blue-950">
            Nothing for you? Create your own group!
          </h1>
          <button className="relative right-15 bottom-5 mt-auto ml-auto rounded-2xl border-blue-950 bg-blue-200 p-5 text-blue-900 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-100">
            Create One Today!
          </button>
        </div>
      </div>
      {/* View all interest groups */}
      <div className="min-h-screen">
        <div className="mx-auto mt-20">
          <h1 className="w-screen text-center text-2xl font-extrabold">
            View all interest groups
          </h1>
          <div className="mx-25 flex flex-row flex-wrap">
            {Object.keys(interest_groups).length > 0 ? (
              <>
                {interest_groups.map((item, index) => (
                  <div
                    key={index}
                    className="mx-auto my-5 w-5/11 rounded-2xl bg-blue-900 p-5 text-blue-100"
                  >
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                  </div>
                ))}
              </>
            ) : (
              <h2 className="text-center">
                Sorry, there are no interest groups right now. Try again later!
              </h2>
            )}
          </div>
        </div>

        {/* Create an interest group */}
        <div className="mx-auto mt-20 text-center">
          <h1 className="w-screen text-center text-2xl font-extrabold">
            Create your own interest group today!
          </h1>
          <SignedIn>
            {/* Create an interest group form */}
            <div className="mx-auto my-5 h-fit w-4/5 rounded-2xl bg-blue-50 p-5 text-left text-blue-900 md:w-2xl">
              <div>
                <label className="block">Interest Group Name</label>
                <input
                  className="block w-full rounded-b-sm border-1 border-blue-500 px-2"
                  type="text"
                  placeholder="Interest Group Name"
                  value={interestGroupName}
                  onChange={(e) => setInterestGroupName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label className="block">Description</label>
                <textarea
                  className="block h-20 w-full resize-none rounded-b-sm border-1 border-blue-500 px-2"
                  placeholder="Insert description here"
                  value={interestGroupDescription}
                  onChange={(e) => setInterestGroupDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={createInterestGroup}
                className="mx-auto mt-5 rounded-2xl bg-blue-900 px-5 py-1 text-center text-blue-100 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-950"
              >
                Create
              </button>
            </div>
          </SignedIn>
          <SignedOut>
            <button
              className="mx-auto my-5 w-50 rounded-2xl bg-blue-900 p-5 text-center text-blue-100 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-950"
              onClick={() => navigate("/signin")}
            >
              Create one now!
            </button>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
