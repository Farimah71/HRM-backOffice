// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { BarLoader } from "react-spinners";
// import { getAllPreCandidates } from "../../../redux/actions/pre-candidate";
// import { Table } from "../../../components";

// export const PreCandidate = () => {
//   // ---------- state ----------
//   const [preCandidateValues, setPreCandidateValues] = useState();

//   // ---------- hooks ----------
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   // ---------- variables ----------
//   const cols = [
//     {
//       key: "id",
//       col: t("table.col.no"),
//     },
//     {
//       key: "name",
//       col: t("table.col.name"),
//     },
//     {
//       key: "family",
//       col: t("table.col.family"),
//     },
//     {
//       key: "email",
//       col: t("table.col.email"),
//     },
//     {
//       key: "phone number",
//       col: t("table.col.phone_number"),
//     },
//   ];
//   const buttonsTable = [
//     {
//       title: t("button.create_title"),
//       path: "/preCandidate/create",
//     },
//   ];
//   const actions = [
//     {
//       type: "edit",
//       path: "/preCandidate/edit/",
//     },
//   ];

//   // ---------- lifeCycle ----------
//   useEffect(() => {
//     dispatch(getAllPreCandidates((data) => setPreCandidateValues(data)));
//   }, []);

//   // ---------- functions ----------
//   const setStateValues = (items) => {
//     setCompanyValues(items);
//   };

//   // ---------- render jsx ----------
//   return (
//     <>
//       <div>
//         {preCandidateValues ? (
//           <Table
//             data={preCandidateValues}
//             cols={cols}
//             buttons={buttonsTable}
//             actions={actions}
//           />
//         ) : (
//           <BarLoader color="#FE6601" className="mx-auto" />
//         )}
//       </div>
//     </>
//   );
// };
