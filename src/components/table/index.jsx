import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const Table = ({ cols, data }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  const NoData = () => (
    <h4 className="text-16 text-custom-orange dark:text-dark_custom-light-black">
      {t("table.no_data")}
    </h4>
  );

  let theme = useSelector((state) => state.themeSlice.theme);

  // ---------- variables ----------
  const customStyles = {
    rows: {
      style: {
        minHeight: "57px", // override the row height
        margin: "5px 0",
        backgroundColor: "transparent",
        borderBottom: "1px dashed rgba(220,220,220) !important",
      },
    },
    headCells: {
      style: {
        padding: "0 8px",
        fontSize: "15px",
        color: theme == "dark" ? "#e9ecef" : "#99a1b7",
        border: "0 !important",
        borderBottom: "none !important",
        backgroundColor: theme == "dark" ? "#343a40" : "inherit",
      },
    },
    cells: {
      style: {
        padding: "0 8px",
        color: "#262323",
        fontWeight: "500",
      },
    },
  };

  // ---------- render jsx ----------
  return (
    data && (
      <DataTable
        columns={cols}
        className="dark:bg-dark_custom-light-black overflow-hidden"
        data={data}
        customStyles={customStyles}
        noDataComponent={NoData()}
      />
    )
  );
};
