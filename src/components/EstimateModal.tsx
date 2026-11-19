import React from "react";
import Dialog from "./Dialog";
import { CONTACT, ESTIMATE_FORM_URL } from "../data/site";

const EstimateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
	<Dialog
		isOpen={isOpen}
		onClose={onClose}
		title="Get a free estimate"
		description={`We reply within 24 hours. Prefer to talk? Call ${CONTACT.phone}.`}
	>
		<iframe
			src={ESTIMATE_FORM_URL}
			title="Free estimate form"
			className="block h-[75vh] w-full"
			loading="lazy"
		>
			Loading…
		</iframe>
	</Dialog>
);

export default EstimateModal;
