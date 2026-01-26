import { useState } from "react";
import { FileText, Download, Eye } from "lucide-react"; // For modern icons

const certificates = [
	{
		title: "IBM DA0101EN Certificate - Data Analysis with Python",
		file: "IBM DA0101EN Certificate _ Cognitive Class.pdf",
	},
	{
		title: "IBM DS0101EN Certificate - Data Science 101",
		file: "IBM DS0101EN Certificate _ Cognitive Class.pdf",
	},
	{
		title: "IBM PY0101EN Certificate - Python 101 for Data Science",
		file: "IBM PY0101EN Certificate _ Cognitive Class.pdf",
	},
	{
		title: "IBMDesign20250304-26 Python for Data Science",
		file: "IBMDesign20250304-26-8p442i.pdf",
	},
	{
		title: "IBMDesign20250304-30 Data Analysis Using Python",
		file: "IBMDesign20250304-30-k8oj2g.pdf",
	},
	{
		title: "IBMDesign20250304-30 Data Science Foundations - Level 1",
		file: "IBMDesign20250304-30-w1x9gw.pdf",
	},
	{
		title: "DataCamp - Intermediate Importing Data in Python.pdf",
		file: "Intermediate Importing Data in Python.pdf",
	},
	{
		title: "DataCamp - Intermediate Python for Developers.pdf",
		file: "Intermediate Python for Developers.pdf",
	},
	{
		title: "DataCamp - Introduction to Importing Data in Python.pdf",
		file: "Introduction to Importing Data in Python.pdf",
	},
	{
		title: "DataCamp - Introduction to Python for Developers.pdf",
		file: "Introduction to Python for Developers.pdf",
	},
	{
		title: "DataCamp - Understanding Cloud Computing.pdf",
		file: "Understanding Cloud Computing.pdf",
	},
];

const Certificates = () => {
	return (
		<section id="certificates" className="py-20 relative overflow-hidden" style={{
			background: 'linear-gradient(180deg, #1a1a3e 0%, #0f172a 50%, #1e1b4b 100%)',
		}}>
			{/* Background glow */}
			<div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

			<div className="max-w-6xl mx-auto px-6 text-center relative z-10">
				<h2 className="text-4xl font-extrabold text-white mb-4">
					My Certificates
				</h2>
				<p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
					Here are some of my professional certifications in Data Analytics and
					Engineering.
				</p>

				{/* Certificates Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{certificates.map((cert, index) => (
						<div
							key={index}
							className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 group"
						>
							{/* Certificate Image or Placeholder */}
							{cert.image ? (
								<img
									src={cert.image}
									alt={cert.title}
									className="w-full h-48 object-cover"
								/>
							) : (
								<div className="flex items-center justify-center h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
									<FileText className="w-16 h-16 text-gray-400 group-hover:text-white transition-colors duration-300" />
								</div>
							)}

							{/* Certificate Details */}
							<div className="p-6 text-center">
								<h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
									{cert.title}
								</h3>
								<div className="mt-4 flex justify-center space-x-4">
									{/* View Button */}
									<a
										href={`/certificates/${cert.file}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
									>
										<Eye className="w-4 h-4 mr-2" />
										View
									</a>

									{/* Download Button */}
									<a
										href={`/certificates/${cert.file}`}
										download={cert.file}
										className="flex items-center px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
									>
										<Download className="w-4 h-4 mr-2" />
										Download
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Certificates;
