		<!-- Topics for Science -->
				<div id="scienceSubjects" class="gone">
					<div class='heading'>Science Subjects</div>
					<button class="subjectButton red" onclick="selectStudy('physicsTopics', this.textContent)">Physics</button>
					<button class="subjectButton green" onclick="selectStudy('chemistryTopics', this.textContent)">Chemistry</button>
					<button class="subjectButton blue" onclick="selectStudy('biologyTopics', this.textContent)">Biology</button>
					<button class="subjectButton yellow" onclick="selectStudy('earthScienceTopics', this.textContent)">Earth Science</button>
					<button class="subjectButton pink" onclick="selectStudy('environmentalScienceTopics', this.textContent)">Environmental Science</button>
					<button class="subjectButton orange" onclick="selectStudy('healthScienceTopics', this.textContent)">Health Science</button>
					<button class="subjectButton grey" onclick="goBack('scienceSubjects')">Back</button>
				</div>
					<!-- Topics for Physics -->
					<div id="physicsTopics" class="gone">
						<div class='heading'>Physics Topics</div>
						<button class="subjectButton red" onclick="selectStudy('mechanicsSubtopics', this.textContent, true)">Mechanics</button>
						<button class="subjectButton green" onclick="selectStudy('thermodynamicsSubtopics', this.textContent, true)">Thermodynamics</button>
						<button class="subjectButton blue" onclick="selectStudy('wavesOpticsSubtopics', this.textContent, true)">Waves and Optics</button>
						<button class="subjectButton yellow" onclick="selectStudy('electricityMagnetismSubtopics', this.textContent, true)">Electricity and Magnetism</button>
						<button class="subjectButton pink" onclick="selectStudy('modernPhysicsSubtopics', this.textContent, true)">Modern Physics</button>
						<button class="subjectButton orange" onclick="selectStudy('astrophysicsSubtopics', this.textContent, true)">Astrophysics</button>
						<button class="subjectButton purple" onclick="selectStudy('motionForcesSubtopics', this.textContent, true)">Motion and Forces</button>
						<button class="subjectButton grey" onclick="goBack('physicsTopics')">Back</button>
					</div>
					<!-- Topics for Chemistry -->
					<div id="chemistryTopics" class="gone">
						<div class='heading'>Chemistry Topics</div>
						<button class="subjectButton red" onclick="selectStudy('generalChemistrySubtopics', this.textContent, true)">General Chemistry</button>
						<button class="subjectButton green" onclick="selectStudy('organicChemistrySubtopics', this.textContent, true)">Organic Chemistry</button>
						<button class="subjectButton blue" onclick="selectStudy('inorganicChemistrySubtopics', this.textContent, true)">Inorganic Chemistry</button>
						<button class="subjectButton yellow" onclick="selectStudy('analyticalChemistrySubtopics', this.textContent, true)">Analytical Chemistry</button>
						<button class="subjectButton pink" onclick="selectStudy('physicalChemistrySubtopics', this.textContent, true)">Physical Chemistry</button>
						<button class="subjectButton orange" onclick="selectStudy('biochemistrySubtopics', this.textContent, true)">Biochemistry</button>
						<button class="subjectButton purple" onclick="selectStudy('environmentalChemistrySubtopics', this.textContent, true)">Environmental Chemistry</button>
						<button class="subjectButton teal" onclick="selectStudy('industrialChemistrySubtopics', this.textContent, true)">Industrial Chemistry</button>
						<button class="subjectButton brown" onclick="selectStudy('chemistryTest', this.textContent, false)">Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('chemistryTopics')">Back</button>
					</div>
					<!-- Topics for Biology -->
					<div id="biologyTopics" class="gone">
						<div class='heading'>Biology Topics</div>
						<button class="subjectButton red" onclick="selectStudy('cellBiologySubtopics', this.textContent, false)">Cell Biology</button>
						<button class="subjectButton green" onclick="selectStudy('geneticsSubtopics', this.textContent, false)">Genetics</button>
						<button class="subjectButton blue" onclick="selectStudy('ecologySubtopics', this.textContent, false)">Ecology</button>
						<button class="subjectButton yellow" onclick="selectStudy('evolutionSubtopics', this.textContent, false)">Evolution</button>
						<button class="subjectButton pink" onclick="selectStudy('physiologySubtopics', this.textContent, false)">Physiology</button>
						<button class="subjectButton orange" onclick="selectStudy('microbiologySubtopics', this.textContent, false)">Microbiology</button>
						<button class="subjectButton purple" onclick="selectStudy('botanySubtopics', this.textContent, false)">Botany</button>
						<button class="subjectButton teal" onclick="selectStudy('zoologySubtopics', this.textContent, false)">Zoology</button>
						<button class="subjectButton brown" onclick="selectStudy('biochemistrySubtopics', this.textContent, false)">Biochemistry</button>
						<button class="subjectButton grey" onclick="goBack('biologyTopics')">Back</button>
					</div>
					<!-- Topics for Earth Science -->
					<div id="earthScienceTopics" class="gone">
						<div class='heading'>Earth Science Topics</div>
						<button class="subjectButton red" onclick="selectStudy('geologySubtopics', this.textContent, true)">Geology</button>
						<button class="subjectButton green" onclick="selectStudy('meteorologySubtopics', this.textContent, true)">Meteorology</button>
						<button class="subjectButton blue" onclick="selectStudy('oceanographySubtopics', this.textContent, true)">Oceanography</button>
						<button class="subjectButton yellow" onclick="selectStudy('astronomySubtopics', this.textContent, true)">Astronomy</button>
						<button class="subjectButton pink" onclick="selectStudy('paleontologySubtopics', this.textContent, true)">Paleontology</button>
						<button class="subjectButton orange" onclick="selectStudy('hydrologySubtopics', this.textContent, true)">Hydrology</button>
						<button class="subjectButton purple" onclick="selectStudy('soilScienceSubtopics', this.textContent, true)">Soil Science</button>
						<button class="subjectButton grey" onclick="goBack('earthScienceTopics')">Back</button>
					</div>
					<!-- Topics for Environmental Science -->
					<div id="environmentalScienceTopics" class="gone">
						<div class='heading'>Environmental Science Topics</div>
						<button class="subjectButton red" onclick="selectStudy('ecosystemsTopic', this.textContent)">Ecosystems</button>
						<button class="subjectButton green" onclick="selectStudy('biodiversityTopic', this.textContent)">Biodiversity</button>
						<button class="subjectButton blue" onclick="selectStudy('naturalResourcesTopic', this.textContent)">Natural Resources</button>
						<button class="subjectButton yellow" onclick="selectStudy('pollutionTopic', this.textContent)">Pollution</button>
						<button class="subjectButton pink" onclick="selectStudy('climateChangeTopic', this.textContent)">Climate Change</button>
						<button class="subjectButton orange" onclick="selectStudy('conservationTopic', this.textContent)">Conservation</button>
						<button class="subjectButton purple" onclick="selectStudy('environmentalPoliciesTopic', this.textContent)">Environmental Policies</button>
						<button class="subjectButton teal" onclick="selectStudy('humanImpactTopic', this.textContent)">Human Impact</button>
						<button class="subjectButton brown" onclick="selectStudy('renewableEnergyTopic', this.textContent)">Renewable Energy</button>
						<button class="subjectButton red" onclick="selectStudy('wasteManagementTopic', this.textContent)">Waste Management</button>
						<button class="subjectButton grey" onclick="goBack('environmentalScienceTopics')">Back</button>
					</div>
					<!-- Topics for Health Science -->
					<div id="healthScienceTopics" class="gone">
						<div class='heading'>Health Science Topics</div>
						<button class="subjectButton red" onclick="selectStudy('humanAnatomyTopic', this.textContent)">Human Anatomy</button>
						<button class="subjectButton green" onclick="selectStudy('physiologyTopic', this.textContent)">Physiology</button>
						<button class="subjectButton blue" onclick="selectStudy('nutritionTopic', this.textContent)">Nutrition</button>
						<button class="subjectButton yellow" onclick="selectStudy('publicHealthTopic', this.textContent)">Public Health</button>
						<button class="subjectButton pink" onclick="selectStudy('epidemiologyTopic', this.textContent)">Epidemiology</button>
						<button class="subjectButton orange" onclick="selectStudy('pathologyTopic', this.textContent)">Pathology</button>
						<button class="subjectButton purple" onclick="selectStudy('pharmacologyTopic', this.textContent)">Pharmacology</button>
						<button class="subjectButton teal" onclick="selectStudy('mentalHealthTopic', this.textContent)">Mental Health</button>
						<button class="subjectButton brown" onclick="selectStudy('healthcareSystemsTopic', this.textContent)">Healthcare Systems</button>
						<button class="subjectButton grey" onclick="goBack('healthScienceTopics')">Back</button>
					</div>

									
					<!--------------------------------------------------------------------------------------------------------------
					
															Physics SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					
					
					<!-- Subtopics for Mechanics -->
					<div id="mechanicsSubtopics" class="gone">
							<div class='heading'>Mechanics Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('kinematicsSubtopic', this.textContent)">Kinematics</button>
							<button class="subjectButton green" onclick="selectStudy('dynamicsSubtopic', this.textContent)">Dynamics</button>
							<button class="subjectButton blue" onclick="selectStudy('energyWorkSubtopic', this.textContent)">Energy and Work</button>
							<button class="subjectButton yellow" onclick="selectStudy('momentumCollisionsSubtopic', this.textContent)">Momentum and Collisions</button>
							<button class="subjectButton pink" onclick="selectStudy('rotationalMotionSubtopic', this.textContent)">Rotational Motion</button>
							<button class="subjectButton orange" onclick="selectStudy('staticsSubtopic', this.textContent)">Statics</button>
							<button class="subjectButton brown" onclick="selectStudy('mechanicsTest', this.textContent)">Mechanics Test</button>
							<button class="subjectButton grey" onclick="goBack('mechanicsSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Thermodynamics -->
					<div id="thermodynamicsSubtopics" class="gone">
							<div class='heading'>Thermodynamics Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('lawsOfThermodynamicsSubtopic', this.textContent)">Laws of Thermodynamics</button>
							<button class="subjectButton green" onclick="selectStudy('heatTransferSubtopic', this.textContent)">Heat and Heat Transfer</button>
							<button class="subjectButton blue" onclick="selectStudy('thermalPropertiesSubtopic', this.textContent)">Thermal Properties and States of Matter</button>
							<button class="subjectButton yellow" onclick="selectStudy('energyConversionEnginesSubtopic', this.textContent)">Energy Conversion and Engines</button>
							<button class="subjectButton pink" onclick="selectStudy('entropyFreeEnergySubtopic', this.textContent)">Entropy and Free Energy</button>
							<button class="subjectButton orange" onclick="selectStudy('bioThermodynamicsSubtopic', this.textContent)">Thermodynamics in Biological Systems</button>
							<button class="subjectButton brown" onclick="selectStudy('thermodynamicsTest', this.textContent)">Thermodynamics Test</button>
							<button class="subjectButton grey" onclick="goBack('thermodynamicsSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Waves and Optics -->
					<div id="wavesOpticsSubtopics" class="gone">
							<div class='heading'>Waves and Optics Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('propertiesOfWavesSubtopic', this.textContent)">Properties of Waves</button>
							<button class="subjectButton green" onclick="selectStudy('soundWavesSubtopic', this.textContent)">Sound Waves</button>
							<button class="subjectButton blue" onclick="selectStudy('lightOpticsSubtopic', this.textContent)">Light and Optics</button>
							<button class="subjectButton yellow" onclick="selectStudy('modernOpticsSubtopic', this.textContent)">Modern Optics</button>
							<button class="subjectButton pink" onclick="selectStudy('waveApplicationsSubtopic', this.textContent)">Wave Applications</button>
							<button class="subjectButton brown" onclick="selectStudy('wavesOpticsTest', this.textContent)">Waves and Optics Test</button>
							<button class="subjectButton grey" onclick="goBack('wavesOpticsSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Electricity and Magnetism -->
					<div id="electricityMagnetismSubtopics" class="gone">
							<div class='heading'>Electricity and Magnetism Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('electrostaticsSubtopic', this.textContent)">Electrostatics</button>
							<button class="subjectButton green" onclick="selectStudy('electricCircuitsSubtopic', this.textContent)">Electric Circuits</button>
							<button class="subjectButton blue" onclick="selectStudy('magnetismSubtopic', this.textContent)">Magnetism</button>
							<button class="subjectButton yellow" onclick="selectStudy('electromagneticInductionSubtopic', this.textContent)">Electromagnetic Induction</button>
							<button class="subjectButton pink" onclick="selectStudy('acCircuitsTransformersSubtopic', this.textContent)">AC Circuits and Transformers</button>
							<button class="subjectButton orange" onclick="selectStudy('electromagneticWavesSubtopic', this.textContent)">Electromagnetic Waves</button>
							<button class="subjectButton brown" onclick="selectStudy('electricityMagnetismTest', this.textContent)">Electricity and Magnetism Test</button>
							<button class="subjectButton grey" onclick="goBack('electricityMagnetismSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Modern Physics -->
					<div id="modernPhysicsSubtopics" class="gone">
							<div class='heading'>Modern Physics Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('quantumMechanicsSubtopic', this.textContent)">Quantum Mechanics</button>
							<button class="subjectButton green" onclick="selectStudy('relativitySubtopic', this.textContent)">Relativity</button>
							<button class="subjectButton blue" onclick="selectStudy('atomicPhysicsSubtopic', this.textContent)">Atomic Physics</button>
							<button class="subjectButton yellow" onclick="selectStudy('nuclearPhysicsSubtopic', this.textContent)">Nuclear Physics</button>
							<button class="subjectButton pink" onclick="selectStudy('particlePhysicsSubtopic', this.textContent)">Particle Physics</button>
							<button class="subjectButton orange" onclick="selectStudy('condensedMatterPhysicsSubtopic', this.textContent)">Condensed Matter Physics</button>
							<button class="subjectButton purple" onclick="selectStudy('cosmologySubtopic', this.textContent)">Cosmology</button>
							<button class="subjectButton brown" onclick="selectStudy('modernPhysicsTest', this.textContent)">Modern Physics Test</button>
							<button class="subjectButton grey" onclick="goBack('modernPhysicsSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Astrophysics -->
					<div id="astrophysicsSubtopics" class="gone">
							<div class='heading'>Astrophysics Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('stellarAstrophysicsSubtopic', this.textContent)">Stellar Astrophysics</button>
							<button class="subjectButton green" onclick="selectStudy('galacticAstronomySubtopic', this.textContent)">Galactic Astronomy</button>
							<button class="subjectButton blue" onclick="selectStudy('cosmologySubtopic', this.textContent)">Cosmology</button>
							<button class="subjectButton yellow" onclick="selectStudy('exoplanetsSolarSystemSubtopic', this.textContent)">Exoplanets and Solar System</button>
							<button class="subjectButton pink" onclick="selectStudy('highEnergyAstrophysicsSubtopic', this.textContent)">High-Energy Astrophysics</button>
							<button class="subjectButton orange" onclick="selectStudy('observationalAstronomySubtopic', this.textContent)">Observational Astronomy</button>
							<button class="subjectButton brown" onclick="selectStudy('astrophysicsTest', this.textContent)">Astrophysics Test</button>
							<button class="subjectButton grey" onclick="goBack('astrophysicsSubtopics')">Back</button>
					</div>
					<!-- Subtopics for Motion and Forces -->
					<div id="motionForcesSubtopics" class="gone">
							<div class='heading'>Motion and Forces Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('kinematicsSubtopic', this.textContent)">Kinematics</button>
							<button class="subjectButton green" onclick="selectStudy('dynamicsSubtopic', this.textContent)">Dynamics</button>
							<button class="subjectButton blue" onclick="selectStudy('circularMotionSubtopic', this.textContent)">Circular Motion</button>
							<button class="subjectButton yellow" onclick="selectStudy('workEnergyPowerSubtopic', this.textContent)">Work, Energy, and Power</button>
							<button class="subjectButton pink" onclick="selectStudy('momentumCollisionsSubtopic', this.textContent)">Momentum and Collisions</button>
							<button class="subjectButton orange" onclick="selectStudy('oscillatoryMotionWavesSubtopic', this.textContent)">Oscillatory Motion and Waves</button>
							<button class="subjectButton brown" onclick="selectStudy('motionForcesTest', this.textContent)">Motion and Forces Test</button>
							<button class="subjectButton grey" onclick="goBack('motionForcesSubtopics')">Back</button>
					</div>

					<!--------------------------------------------------------------------------------------------------------------
					
															Chemistry SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					
					<!-- Subtopics for General Chemistry -->
					<div id="generalChemistrySubtopics" class="gone">
						<div class='heading'>General Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('atomicStructureSubtopic', this.textContent)">Atomic Structure</button>
						<button class="subjectButton green" onclick="selectStudy('periodicTableSubtopic', this.textContent)">Periodic Table</button>
						<button class="subjectButton blue" onclick="selectStudy('chemicalBondingSubtopic', this.textContent)">Chemical Bonding</button>
						<button class="subjectButton yellow" onclick="selectStudy('stoichiometrySubtopic', this.textContent)">Stoichiometry</button>
						<button class="subjectButton pink" onclick="selectStudy('statesOfMatterSubtopic', this.textContent)">States of Matter</button>
						<button class="subjectButton orange" onclick="selectStudy('thermochemistrySubtopic', this.textContent)">Thermochemistry</button>
						<button class="subjectButton purple" onclick="selectStudy('chemicalKineticsSubtopic', this.textContent)">Chemical Kinetics</button>
						<button class="subjectButton teal" onclick="selectStudy('chemicalEquilibriumSubtopic', this.textContent)">Chemical Equilibrium</button>
						<button class="subjectButton brown" onclick="selectStudy('acidsBasesPHSubtopic', this.textContent)">Acids, Bases, and pH</button>
						<button class="subjectButton green" onclick="selectStudy('redoxReactionsSubtopic', this.textContent)">Redox Reactions</button>
						<button class="subjectButton brown" onclick="selectStudy('generalChemistryTest', this.textContent)">General Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('generalChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Organic Chemistry -->
					<div id="organicChemistrySubtopics" class="gone">
						<div class='heading'>Organic Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('hydrocarbonsSubtopic', this.textContent)">Hydrocarbons</button>
						<button class="subjectButton green" onclick="selectStudy('functionalGroupsSubtopic', this.textContent)">Functional Groups</button>
						<button class="subjectButton blue" onclick="selectStudy('stereochemistrySubtopic', this.textContent)">Stereochemistry</button>
						<button class="subjectButton yellow" onclick="selectStudy('reactionMechanismsSubtopic', this.textContent)">Reaction Mechanisms</button>
						<button class="subjectButton pink" onclick="selectStudy('synthesisRetrosynthesisSubtopic', this.textContent)">Synthesis and Retrosynthesis</button>
						<button class="subjectButton orange" onclick="selectStudy('spectroscopySubtopic', this.textContent)">Spectroscopy</button>
						<button class="subjectButton purple" onclick="selectStudy('polymersSubtopic', this.textContent)">Polymers</button>
						<button class="subjectButton teal" onclick="selectStudy('bioorganicChemistrySubtopic', this.textContent)">Bioorganic Chemistry</button>
						<button class="subjectButton red" onclick="selectStudy('greenChemistrySubtopic', this.textContent)">Green Chemistry</button>
						<button class="subjectButton brown" onclick="selectStudy('organicChemistryTest', this.textContent)">Organic Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('organicChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Inorganic Chemistry -->
					<div id="inorganicChemistrySubtopics" class="gone">
						<div class='heading'>Inorganic Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('periodicTablePeriodicitySubtopic', this.textContent)">Periodic Table and Periodicity</button>
						<button class="subjectButton green" onclick="selectStudy('chemistryOfMetalsSubtopic', this.textContent)">Chemistry of Metals</button>
						<button class="subjectButton blue" onclick="selectStudy('chemistryOfNonmetalsSubtopic', this.textContent)">Chemistry of Nonmetals</button>
						<button class="subjectButton yellow" onclick="selectStudy('coordinationCompoundsSubtopic', this.textContent)">Coordination Compounds</button>
						<button class="subjectButton pink" onclick="selectStudy('solidStateChemistrySubtopic', this.textContent)">Solid State Chemistry</button>
						<button class="subjectButton orange" onclick="selectStudy('transitionMetalsSubtopic', this.textContent)">Transition Metals</button>
						<button class="subjectButton purple" onclick="selectStudy('bioinorganicChemistrySubtopic', this.textContent)">Bioinorganic Chemistry</button>
						<button class="subjectButton teal" onclick="selectStudy('synthesisTechniquesSubtopic', this.textContent)">Synthesis Techniques</button>
						<button class="subjectButton red" onclick="selectStudy('spectroscopicMethodsSubtopic', this.textContent)">Spectroscopic Methods in Inorganic Chemistry</button>
						<button class="subjectButton brown" onclick="selectStudy('inorganicChemistryTest', this.textContent)">Inorganic Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('inorganicChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Analytical Chemistry -->
					<div id="analyticalChemistrySubtopics" class="gone">
						<div class='heading'>Analytical Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('qualitativeAnalysisSubtopic', this.textContent)">Qualitative Analysis</button>
						<button class="subjectButton green" onclick="selectStudy('quantitativeAnalysisSubtopic', this.textContent)">Quantitative Analysis</button>
						<button class="subjectButton blue" onclick="selectStudy('chromatographySubtopic', this.textContent)">Chromatography</button>
						<button class="subjectButton yellow" onclick="selectStudy('spectroscopySubtopic', this.textContent)">Spectroscopy</button>
						<button class="subjectButton pink" onclick="selectStudy('electrochemicalAnalysisSubtopic', this.textContent)">Electrochemical Analysis</button>
						<button class="subjectButton orange" onclick="selectStudy('titrimetricMethodsSubtopic', this.textContent)">Titrimetric Methods</button>
						<button class="subjectButton purple" onclick="selectStudy('thermalAnalysisSubtopic', this.textContent)">Thermal Analysis</button>
						<button class="subjectButton teal" onclick="selectStudy('microscopyTechniquesSubtopic', this.textContent)">Microscopy Techniques</button>
						<button class="subjectButton red" onclick="selectStudy('environmentalChemicalAnalysisSubtopic', this.textContent)">Environmental Chemical Analysis</button>
						<button class="subjectButton brown" onclick="selectStudy('analyticalChemistryTest', this.textContent)">Analytical Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('analyticalChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Physical Chemistry -->
					<div id="physicalChemistrySubtopics" class="gone">
						<div class='heading'>Physical Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('thermodynamicsSubtopic', this.textContent)">Thermodynamics</button>
						<button class="subjectButton green" onclick="selectStudy('chemicalKineticsSubtopic', this.textContent)">Chemical Kinetics</button>
						<button class="subjectButton blue" onclick="selectStudy('quantumChemistrySubtopic', this.textContent)">Quantum Chemistry</button>
						<button class="subjectButton yellow" onclick="selectStudy('statisticalMechanicsSubtopic', this.textContent)">Statistical Mechanics</button>
						<button class="subjectButton pink" onclick="selectStudy('surfaceChemistrySubtopic', this.textContent)">Surface Chemistry</button>
						<button class="subjectButton orange" onclick="selectStudy('electrochemistrySubtopic', this.textContent)">Electrochemistry</button>
						<button class="subjectButton purple" onclick="selectStudy('spectroscopySubtopic', this.textContent)">Spectroscopy</button>
						<button class="subjectButton teal" onclick="selectStudy('molecularDynamicsSubtopic', this.textContent)">Molecular Dynamics</button>
						<button class="subjectButton red" onclick="selectStudy('solidStateChemistrySubtopic', this.textContent)">Solid State Chemistry</button>
						<button class="subjectButton brown" onclick="selectStudy('physicalChemistryTest', this.textContent)">Physical Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('physicalChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Biochemistry -->
					<div id="biochemistrySubtopics" class="gone">
						<div class='heading'>Biochemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('molecularBiologySubtopic', this.textContent)">Molecular Biology</button>
						<button class="subjectButton green" onclick="selectStudy('enzymologySubtopic', this.textContent)">Enzymology</button>
						<button class="subjectButton blue" onclick="selectStudy('metabolismSubtopic', this.textContent)">Metabolism</button>
						<button class="subjectButton yellow" onclick="selectStudy('cellSignalingSubtopic', this.textContent)">Cell Signaling</button>
						<button class="subjectButton pink" onclick="selectStudy('structuralBiologySubtopic', this.textContent)">Structural Biology</button>
						<button class="subjectButton orange" onclick="selectStudy('geneticsSubtopic', this.textContent)">Genetics</button>
						<button class="subjectButton purple" onclick="selectStudy('immunologySubtopic', this.textContent)">Immunology</button>
						<button class="subjectButton teal" onclick="selectStudy('pharmacologySubtopic', this.textContent)">Pharmacology</button>
						<button class="subjectButton red" onclick="selectStudy('nutritionalBiochemistrySubtopic', this.textContent)">Nutritional Biochemistry</button>
						<button class="subjectButton brown" onclick="selectStudy('biochemistryTest', this.textContent)">Biochemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('biochemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Environmental Chemistry -->
					<div id="environmentalChemistrySubtopics" class="gone">
						<div class='heading'>Environmental Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('atmosphericChemistrySubtopic', this.textContent)">Atmospheric Chemistry</button>
						<button class="subjectButton green" onclick="selectStudy('aquaticChemistrySubtopic', this.textContent)">Aquatic Chemistry</button>
						<button class="subjectButton blue" onclick="selectStudy('soilChemistrySubtopic', this.textContent)">Soil Chemistry</button>
						<button class="subjectButton yellow" onclick="selectStudy('toxicologySubtopic', this.textContent)">Toxicology</button>
						<button class="subjectButton pink" onclick="selectStudy('wasteManagementSubtopic', this.textContent)">Waste Management</button>
						<button class="subjectButton orange" onclick="selectStudy('chemicalFateTransportSubtopic', this.textContent)">Chemical Fate and Transport</button>
						<button class="subjectButton purple" onclick="selectStudy('environmentalBiogeochemistrySubtopic', this.textContent)">Environmental Biogeochemistry</button>
						<button class="subjectButton teal" onclick="selectStudy('greenChemistrySubtopic', this.textContent)">Green Chemistry</button>
						<button class="subjectButton red" onclick="selectStudy('environmentalMonitoringAnalysisSubtopic', this.textContent)">Environmental Monitoring and Analysis</button>
						<button class="subjectButton brown" onclick="selectStudy('environmentalChemistryTest', this.textContent)">Environmental Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('environmentalChemistrySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Industrial Chemistry -->
					<div id="industrialChemistrySubtopics" class="gone">
						<div class='heading'>Industrial Chemistry Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('processChemistrySubtopic', this.textContent)">Process Chemistry</button>
						<button class="subjectButton green" onclick="selectStudy('materialsScienceSubtopic', this.textContent)">Materials Science</button>
						<button class="subjectButton blue" onclick="selectStudy('petrochemicalsSubtopic', this.textContent)">Petrochemicals</button>
						<button class="subjectButton yellow" onclick="selectStudy('pharmaceuticalChemistrySubtopic', this.textContent)">Pharmaceutical Chemistry</button>
						<button class="subjectButton pink" onclick="selectStudy('agrochemicalsSubtopic', this.textContent)">Agrochemicals</button>
						<button class="subjectButton orange" onclick="selectStudy('polymerChemistrySubtopic', this.textContent)">Polymer Chemistry</button>
						<button class="subjectButton purple" onclick="selectStudy('greenManufacturingSubtopic', this.textContent)">Green Manufacturing</button>
						<button class="subjectButton teal" onclick="selectStudy('catalysisReactionEngineeringSubtopic', this.textContent)">Catalysis and Reaction Engineering</button>
						<button class="subjectButton red" onclick="selectStudy('qualityControlAssuranceSubtopic', this.textContent)">Quality Control and Assurance</button>
						<button class="subjectButton brown" onclick="selectStudy('industrialChemistryTest', this.textContent)">Industrial Chemistry Test</button>
						<button class="subjectButton grey" onclick="goBack('industrialChemistrySubtopics')">Back</button>
					</div>

					
					<!--------------------------------------------------------------------------------------------------------------
					
															Earth Science SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					<!-- Subtopics for Geology -->
					<div id="geologySubtopics" class="gone">
						<div class='heading'>Geology Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('typesOfRocksSubtopic', this.textContent)">Types of Rocks</button>
						<button class="subjectButton green" onclick="selectStudy('fossilsSubtopic', this.textContent)">Fossils</button>
						<button class="subjectButton blue" onclick="selectStudy('earthsLayersSubtopic', this.textContent)">Earth's Layers</button>
						<button class="subjectButton yellow" onclick="selectStudy('weatheringErosionSubtopic', this.textContent)">Weathering and Erosion</button>
						<button class="subjectButton pink" onclick="selectStudy('volcanoesSubtopic', this.textContent)">Volcanoes</button>
						<button class="subjectButton orange" onclick="selectStudy('earthquakesSubtopic', this.textContent)">Earthquakes</button>
						<button class="subjectButton purple" onclick="selectStudy('mineralsSubtopic', this.textContent)">Minerals</button>
						<button class="subjectButton brown" onclick="selectStudy('geologyTest', this.textContent)">Geology Test</button>
						<button class="subjectButton grey" onclick="goBack('geologySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Meteorology -->
					<div id="meteorologySubtopics" class="gone">
						<div class='heading'>Meteorology Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('weatherBasicsSubtopic', this.textContent)">Weather Basics</button>
						<button class="subjectButton green" onclick="selectStudy('waterCycleSubtopic', this.textContent)">The Water Cycle</button>
						<button class="subjectButton blue" onclick="selectStudy('typesOfCloudsSubtopic', this.textContent)">Types of Clouds</button>
						<button class="subjectButton yellow" onclick="selectStudy('stormsSevereWeatherSubtopic', this.textContent)">Storms and Severe Weather</button>
						<button class="subjectButton pink" onclick="selectStudy('climateZonesSubtopic', this.textContent)">Climate Zones</button>
						<button class="subjectButton orange" onclick="selectStudy('forecastingWeatherSubtopic', this.textContent)">Forecasting Weather</button>
						<button class="subjectButton purple" onclick="selectStudy('humanImpactWeatherSubtopic', this.textContent)">Human Impact on Weather</button>
						<button class="subjectButton brown" onclick="selectStudy('meteorologyTest', this.textContent)">Meteorology Test</button>
						<button class="subjectButton grey" onclick="goBack('meteorologySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Oceanography -->
					<div id="oceanographySubtopics" class="gone">
						<div class='heading'>Oceanography Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('oceanBasicsSubtopic', this.textContent)">Ocean Basics</button>
						<button class="subjectButton green" onclick="selectStudy('marineEcosystemsSubtopic', this.textContent)">Marine Ecosystems</button>
						<button class="subjectButton blue" onclick="selectStudy('oceanCurrentsSubtopic', this.textContent)">Ocean Currents</button>
						<button class="subjectButton yellow" onclick="selectStudy('marineLifeSubtopic', this.textContent)">Marine Life</button>
						<button class="subjectButton pink" onclick="selectStudy('tidesWavesSubtopic', this.textContent)">Tides and Waves</button>
						<button class="subjectButton orange" onclick="selectStudy('humanImpactOceansSubtopic', this.textContent)">Human Impact on Oceans</button>
						<button class="subjectButton purple" onclick="selectStudy('oceanExplorationSubtopic', this.textContent)">Ocean Exploration</button>
						<button class="subjectButton brown" onclick="selectStudy('oceanographyTest', this.textContent)">Oceanography Test</button>
						<button class="subjectButton grey" onclick="goBack('oceanographySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Astronomy -->
					<div id="astronomySubtopics" class="gone">
						<div class='heading'>Astronomy Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('solarSystemSubtopic', this.textContent)">Solar System</button>
						<button class="subjectButton green" onclick="selectStudy('starsGalaxiesSubtopic', this.textContent)">Stars and Galaxies</button>
						<button class="subjectButton blue" onclick="selectStudy('constellationsSubtopic', this.textContent)">Constellations</button>
						<button class="subjectButton yellow" onclick="selectStudy('telescopesSubtopic', this.textContent)">Telescopes</button>
						<button class="subjectButton pink" onclick="selectStudy('spaceExplorationSubtopic', this.textContent)">Space Exploration</button>
						<button class="subjectButton orange" onclick="selectStudy('theUniverseSubtopic', this.textContent)">The Universe</button>
						<button class="subjectButton purple" onclick="selectStudy('eclipsesPhenomenaSubtopic', this.textContent)">Eclipses and Phenomena</button>
						<button class="subjectButton brown" onclick="selectStudy('astronomyTest', this.textContent)">Astronomy Test</button>
						<button class="subjectButton grey" onclick="goBack('astronomySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Paleontology -->
					<div id="paleontologySubtopics" class="gone">
						<div class='heading'>Paleontology Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('introductionToFossilsSubtopic', this.textContent)">Introduction to Fossils</button>
						<button class="subjectButton green" onclick="selectStudy('fossilIdentificationSubtopic', this.textContent)">Fossil Identification</button>
						<button class="subjectButton blue" onclick="selectStudy('dinosaurEraSubtopic', this.textContent)">Dinosaur Era</button>
						<button class="subjectButton yellow" onclick="selectStudy('massExtinctionsSubtopic', this.textContent)">Mass Extinctions</button>
						<button class="subjectButton pink" onclick="selectStudy('evolutionaryBiologySubtopic', this.textContent)">Evolutionary Biology</button>
						<button class="subjectButton orange" onclick="selectStudy('paleoecologySubtopic', this.textContent)">Paleoecology</button>
						<button class="subjectButton purple" onclick="selectStudy('humanEvolutionSubtopic', this.textContent)">Human Evolution</button>
						<button class="subjectButton teal" onclick="selectStudy('fieldMethodsInPaleontologySubtopic', this.textContent)">Field Methods in Paleontology</button>
						<button class="subjectButton red" onclick="selectStudy('paleontologyInPopularCultureSubtopic', this.textContent)">Paleontology in Popular Culture</button>
						<button class="subjectButton brown" onclick="selectStudy('paleontologyTest', this.textContent)">Paleontology Test</button>
						<button class="subjectButton grey" onclick="goBack('paleontologySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Hydrology -->
					<div id="hydrologySubtopics" class="gone">
						<div class='heading'>Hydrology Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('waterCycleSubtopic', this.textContent)">Water Cycle</button>
						<button class="subjectButton green" onclick="selectStudy('aquifersGroundwaterSubtopic', this.textContent)">Aquifers and Groundwater</button>
						<button class="subjectButton blue" onclick="selectStudy('riversStreamsSubtopic', this.textContent)">Rivers and Streams</button>
						<button class="subjectButton yellow" onclick="selectStudy('lakesPondsSubtopic', this.textContent)">Lakes and Ponds</button>
						<button class="subjectButton pink" onclick="selectStudy('wetlandsSubtopic', this.textContent)">Wetlands</button>
						<button class="subjectButton orange" onclick="selectStudy('waterQualitySubtopic', this.textContent)">Water Quality</button>
						<button class="subjectButton purple" onclick="selectStudy('humanImpactWaterResourcesSubtopic', this.textContent)">Human Impact on Water Resources</button>
						<button class="subjectButton teal" onclick="selectStudy('conservationWaterResourcesSubtopic', this.textContent)">Conservation of Water Resources</button>
						<button class="subjectButton red" onclick="selectStudy('climateChangeHydrologySubtopic', this.textContent)">Climate Change and Hydrology</button>
						<button class="subjectButton brown" onclick="selectStudy('hydrologyTest', this.textContent)">Hydrology Test</button>
						<button class="subjectButton grey" onclick="goBack('hydrologySubtopics')">Back</button>
					</div>
					<!-- Subtopics for Soil Science -->
					<div id="soilScienceSubtopics" class="gone">
						<div class='heading'>Soil Science Subtopics</div>
						<button class="subjectButton red" onclick="selectStudy('soilCompositionSubtopic', this.textContent)">Soil Composition</button>
						<button class="subjectButton green" onclick="selectStudy('soilTypesSubtopic', this.textContent)">Soil Types</button>
						<button class="subjectButton blue" onclick="selectStudy('soilFormationSubtopic', this.textContent)">Soil Formation</button>
						<button class="subjectButton yellow" onclick="selectStudy('soilErosionSubtopic', this.textContent)">Soil Erosion</button>
						<button class="subjectButton pink" onclick="selectStudy('soilConservationSubtopic', this.textContent)">Soil Conservation</button>
						<button class="subjectButton orange" onclick="selectStudy('soilPlantGrowthSubtopic', this.textContent)">Soil and Plant Growth</button>
						<button class="subjectButton purple" onclick="selectStudy('soilPollutantsSubtopic', this.textContent)">Soil Pollutants</button>
						<button class="subjectButton teal" onclick="selectStudy('soilTestingSubtopic', this.textContent)">Soil Testing</button>
						<button class="subjectButton brown" onclick="selectStudy('soilClimateSubtopic', this.textContent)">Soil and Climate</button>
						<button class="subjectButton grey" onclick="selectStudy('soilScienceTest', this.textContent)">Soil Science Test</button>
						<button class="subjectButton grey" onclick="goBack('soilScienceSubtopics')">Back</button>
					</div>
