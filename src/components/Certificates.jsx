import { useState } from "react";
import { FileText, Download, Eye, Terminal, Folder } from "lucide-react";

const certificates = [
	{
		title: "IBM DA0101EN Certificate - Data Analysis with Python",
		file: "IBM DA0101EN Certificate _ Cognitive Class.pdf",
		size: "4.2K",
		date: "Mar 2025"
	},
	{
		title: "IBM DS0101EN Certificate - Data Science 101",
		file: "IBM DS0101EN Certificate _ Cognitive Class.pdf",
		size: "3.8K",
		date: "Mar 2025"
	},
	{
		title: "IBM PY0101EN Certificate - Python 101 for Data Science",
		file: "IBM PY0101EN Certificate _ Cognitive Class.pdf",
		size: "4.1K",
		date: "Mar 2025"
	},
	{
		title: "IBMDesign - Python for Data Science",
		file: "IBMDesign20250304-26-8p442i.pdf",
		size: "2.9K",
		date: "Mar 2025"
	},
	{
		title: "IBMDesign - Data Analysis Using Python",
		file: "IBMDesign20250304-30-k8oj2g.pdf",
		size: "3.1K",
		date: "Mar 2025"
	},
	{
		title: "IBMDesign - Data Science Foundations Level 1",
		file: "IBMDesign20250304-30-w1x9gw.pdf",
		size: "3.5K",
		date: "Mar 2025"
	},
	{
		title: "DataCamp - Intermediate Importing Data in Python",
		file: "Intermediate Importing Data in Python.pdf",
		size: "2.8K",
		date: "2024"
	},
	{
		title: "DataCamp - Intermediate Python for Developers",
		file: "Intermediate Python for Developers.pdf",
		size: "3.2K",
		date: "2024"
	},
	{
		title: "DataCamp - Introduction to Importing Data in Python",
		file: "Introduction to Importing Data in Python.pdf",
		size: "2.5K",
		date: "2024"
	},
	{
		title: "DataCamp - Introduction to Python for Developers",
		file: "Introduction to Python for Developers.pdf",
		size: "2.7K",
		date: "2024"
	},
	{
		title: "DataCamp - Understanding Cloud Computing",
		file: "Understanding Cloud Computing.pdf",
		size: "3.0K",
		date: "2024"
	},
];

const Certificates = () => {
	const [selectedCert, setSelectedCert] = useState(null);
	const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

	return (
		<section id="certificates" className="py-12 relative overflow-hidden min-h-screen" style={{
			background: 'linear-gradient(180deg, #1a1a3e 0%, #0f172a 50%, #1e1b4b 100%)',
		}}>
			{/* Background glow */}
			<div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

				{/* Terminal Window Frame */}
				<div className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden">

					{/* Terminal Title Bar */}
					<div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/10">
						<div className="flex items-center gap-2">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-red-500"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
								<div className="w-3 h-3 rounded-full bg-green-500"></div>
							</div>
							<span className="ml-4 text-gray-400 text-sm font-mono">
								<span className="text-purple-400">~/</span>certificates<span className="text-cyan-400">/</span>
							</span>
						</div>
						{/* View Mode Toggle */}
						<div className="flex items-center gap-2">
							<button
								onClick={() => setViewMode('list')}
								className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'}`}
							>
								<Terminal className="w-4 h-4" />
							</button>
							<button
								onClick={() => setViewMode('grid')}
								className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'}`}
							>
								<Folder className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Terminal Content */}
					<div className="p-6 font-mono">

						{/* Header */}
						<div className="mb-6">
							<p className="text-green-400 text-sm">
								$ ls -la ~/certificates/
							</p>
							<h2 className="text-3xl font-bold text-white mt-2">
								<span className="text-cyan-400">{"# "}</span>
								My Certificates
							</h2>
							<p className="text-gray-500 text-sm mt-1">
								{"// "} Professional certifications in Data & AI
							</p>
						</div>

						{/* List View - ls -la style */}
						{viewMode === 'list' && (
							<div className="bg-slate-800/50 rounded-lg border border-white/10 overflow-hidden">
								{/* Table Header */}
								<div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-700/50 border-b border-white/10 text-xs text-gray-500">
									<span className="col-span-1">Type</span>
									<span className="col-span-5">Filename</span>
									<span className="col-span-2">Size</span>
									<span className="col-span-2">Date</span>
									<span className="col-span-2">Actions</span>
								</div>

								{/* Certificate Rows */}
								<div className="divide-y divide-white/5">
									{certificates.map((cert, index) => (
										<div
											key={index}
											className={`grid grid-cols-12 gap-2 px-4 py-3 text-sm hover:bg-white/5 transition-colors cursor-pointer ${selectedCert === index ? 'bg-purple-500/10' : ''}`}
											onClick={() => setSelectedCert(selectedCert === index ? null : index)}
										>
											<span className="col-span-1 text-gray-500">-rw-r--r--</span>
											<span className="col-span-5 text-cyan-400 truncate hover:text-cyan-300" title={cert.title}>
												{cert.file.slice(0, 35)}...
											</span>
											<span className="col-span-2 text-gray-400">{cert.size}</span>
											<span className="col-span-2 text-gray-500">{cert.date}</span>
											<span className="col-span-2 flex gap-2">
												<a
													href={`/certificates/${cert.file}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-purple-400 hover:text-purple-300 transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													<Eye className="w-4 h-4" />
												</a>
												<a
													href={`/certificates/${cert.file}`}
													download={cert.file}
													className="text-green-400 hover:text-green-300 transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													<Download className="w-4 h-4" />
												</a>
											</span>
										</div>
									))}
								</div>

								{/* Total count */}
								<div className="px-4 py-2 bg-slate-700/30 border-t border-white/10 text-xs text-gray-500">
									total {certificates.length} items
								</div>
							</div>
						)}

						{/* Grid View - File icons */}
						{viewMode === 'grid' && (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
								{certificates.map((cert, index) => (
									<div
										key={index}
										className={`p-4 rounded-xl text-center transition-all duration-300 cursor-pointer group ${selectedCert === index
												? 'bg-purple-500/20 border border-purple-400/30'
												: 'bg-slate-800/50 border border-white/10 hover:bg-white/5 hover:border-white/20'
											}`}
										onClick={() => setSelectedCert(selectedCert === index ? null : index)}
									>
										{/* PDF Icon */}
										<div className="flex justify-center mb-3">
											<div className="w-16 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
												<FileText className="w-8 h-8 text-red-400" />
											</div>
										</div>

										{/* Filename */}
										<p className="text-xs text-gray-400 truncate group-hover:text-white transition-colors" title={cert.title}>
											{cert.file.slice(0, 20)}...
										</p>
										<p className="text-[10px] text-gray-600 mt-1">{cert.size}</p>

										{/* Actions on hover */}
										<div className="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
											<a
												href={`/certificates/${cert.file}`}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/30 transition-colors"
												onClick={(e) => e.stopPropagation()}
											>
												View
											</a>
											<a
												href={`/certificates/${cert.file}`}
												download={cert.file}
												className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition-colors"
												onClick={(e) => e.stopPropagation()}
											>
												↓
											</a>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Selected Certificate Details */}
						{selectedCert !== null && (
							<div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-purple-400/20 animate-in fade-in duration-200">
								<p className="text-green-400 text-sm mb-2">$ cat {certificates[selectedCert].file.slice(0, 30)}...</p>
								<h3 className="text-white font-medium">{certificates[selectedCert].title}</h3>
								<div className="flex gap-4 mt-3">
									<a
										href={`/certificates/${certificates[selectedCert].file}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 rounded-lg text-white hover:border-purple-400 transition-colors"
									>
										<Eye className="w-4 h-4" />
										Open
									</a>
									<a
										href={`/certificates/${certificates[selectedCert].file}`}
										download={certificates[selectedCert].file}
										className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-700/50 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-colors"
									>
										<Download className="w-4 h-4" />
										Download
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Certificates;
