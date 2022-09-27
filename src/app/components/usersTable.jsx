import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Name" },
        qualities: {
            name: "Qualities",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Job" },
        completedMeetings: { path: "completedMeetings", name: "Meets, times" },
        rate: {
            path: "rate",
            name: "Rating"
        },
        bookmark: {
            path: "bookmark",
            name: "Favorite",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className={"btn btn-outline-danger"}
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
