import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const initialMembers = [
    { id: 1, name: "John Doe", party: "Party A", status: "Pending" },
    { id: 2, name: "Jane Smith", party: "Party B", status: "Pending" },
    { id: 3, name: "Jim Brown", party: "Party C", status: "Pending" },
    { id: 4, name: "Jill White", party: "Party D", status: "Pending" },
    { id: 5, name: "Jack Black", party: "Party E", status: "Pending" },
    { id: 6, name: "Jenny Green", party: "Party F", status: "Pending" },
];

const ApprovePartyMembers = () => {
    const [members, setMembers] = useState(initialMembers);

    const handleApproval = (id, status) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === id ? { ...member, status } : member
            )
        );

        MySwal.fire({
            title: `Member ${status}`,
            icon: status === "Approved" ? 'success' : 'error',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Approve Party Members</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Party</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={member.name}
                                    readOnly
                                    className="input input-bordered input-primary w-full max-w-xs"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={member.party}
                                    readOnly
                                    className="input input-bordered input-primary w-full max-w-xs"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={member.status}
                                    readOnly
                                    className="input input-bordered input-primary w-full max-w-xs"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                {member.status === "Pending" && (
                                    <>
                                        <button
                                            className="btn btn-outline btn-success mr-2"
                                            onClick={() => handleApproval(member.id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-outline btn-danger"
                                            onClick={() => handleApproval(member.id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovePartyMembers;
