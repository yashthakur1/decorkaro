import React, { createContext, useCallback, useContext, useState } from "react";
import EstimateModal from "./EstimateModal";
import AIRoomPlannerModal from "./AIRoomPlannerModal";

interface ModalApi {
	openEstimate: () => void;
	openPlanner: () => void;
}

const ModalContext = createContext<ModalApi>({ openEstimate: () => {}, openPlanner: () => {} });

/** One instance of each modal for the whole site, opened from any CTA. */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [estimateOpen, setEstimateOpen] = useState(false);
	const [plannerOpen, setPlannerOpen] = useState(false);
	const openEstimate = useCallback(() => setEstimateOpen(true), []);
	const openPlanner = useCallback(() => setPlannerOpen(true), []);

	return (
		<ModalContext.Provider value={{ openEstimate, openPlanner }}>
			{children}
			<EstimateModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />
			<AIRoomPlannerModal
				isOpen={plannerOpen}
				onClose={() => setPlannerOpen(false)}
				onBookConsultation={() => {
					setPlannerOpen(false);
					setEstimateOpen(true);
				}}
			/>
		</ModalContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModals = () => useContext(ModalContext);
