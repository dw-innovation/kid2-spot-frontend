import React, { useEffect, useState } from "react";

import Select from "@/components/Select";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { getAreas } from "@/lib/utils";

type Props = {
  area: string;
};

const AreaSelector = ({ area }: Props) => {
  const [place_id, setPlace_id] = useState<string>("");
  const [suggestedAreas, setSuggestedAreas] = useState<any[]>([]);
  const [apiStatus, fetchData] = useApiStatus(getAreas);

  useEffect(() => {
    fetchData(area).then(setSuggestedAreas);
  }, [area]);

  const options = suggestedAreas.map((a) => ({
    label: a.display_name,
    value: a.place_id,
  }));

  useEffect(() => {
    if (options.length > 0) {
      setPlace_id(options[0].value);
    }
  }, [suggestedAreas]);

  return (
    <div>
      {apiStatus === "loading" && <div>Loading...</div>}
      {options.length > 0 && (
        <Select options={options} value={place_id} onSelect={setPlace_id} />
      )}
    </div>
  );
};

export default AreaSelector;
