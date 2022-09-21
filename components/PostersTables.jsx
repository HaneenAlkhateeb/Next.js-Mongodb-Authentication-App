import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getServerSideProps() {
    const res = await fetch("/api/fetchPosters", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const allPosters = [];
    if (res.status === 200){
        allPosters = await res.json();
    }
    console.log('fsdfsa');
    return {
      props: { allPosters },
    };
  }

const DashboardSection = async (allPosters) => {
    console.log(allPosters);
    const [user, { mutate }] = useCurrentUser();
    const [posters, { mutatePosters }] = useState();
    const [loading, isLoading] = useState(false);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();
    const res = await fetch("/api/fetchPosters", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    console.log(res);
   

    const getposters = async (e) => {
        e.preventDefault();
        updateLoad(true);
        const res = await fetch("/api/fetchPosters", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (res.status === 201) {
            setMsgAck(true);
            setTimeout(() => setMsgAck(false), 2500)
        } else if (res.status === 200){
            const allPosters = await res.json();
            // writing our user object to the state
            mutatePosters(allPosters);
        }else {
            setErrorMsg(await res.text());
        }
        updateLoad(false);
        var msgForm = document.getElementById("msgForm");
        msgForm.reset();
    };

    const people = [


        {
          name: 'Lindsay Walton',
          title: 'Front-end Developer',
          department: 'Optimization',
          email: 'lindsay.walton@example.com',
          role: 'Member',
          image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More people...
      ]

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Posters</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the Posters added including their name, phone, email.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link href='/postersForm'><a className='btn btn-primary'>Add New Poster</a></Link>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Email
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Phone
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Added by
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Added Date
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {(people)?people.map((person) => (
                                <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{person.name}</div>
                                        <div className="text-gray-500">{person.email}</div>
                                    </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">{person.title}</div>
                                    <div className="text-gray-500">{person.department}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Active
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                                </tr>
                            )):<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Loading
                            </th>}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </>
    );
};


const DashboardPage = (allPosters) => {
    console.log('allPosters');
    if (!allPosters) {
        return (
            <>
                <p>Loading</p>
            </>
        );
    }
    return (
        <>
            <DashboardSection />
        </>
    );
};
export default DashboardPage;