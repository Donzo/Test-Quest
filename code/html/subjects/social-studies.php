		<!-- Topics for Social Studies -->
				<div id="socialStudiesSubjects" class="gone">
					<div class='heading'>Social Studies Subjects</div>
					<button class="subjectButton red" onclick="selectStudy('historyTopics', this.textContent)">History</button>
					<button class="subjectButton green" onclick="selectStudy('economicsTopics', this.textContent)">Economics</button>
					<button class="subjectButton blue" onclick="selectStudy('sociologyTopics', this.textContent)">Sociology</button>
					<button class="subjectButton yellow" onclick="selectStudy('geographyTopics', this.textContent)">Geography</button>
					<button class="subjectButton pink" onclick="selectStudy('politicalScienceTopics', this.textContent)">Political Science</button>
					<button class="subjectButton orange" onclick="selectStudy('anthropologyTopics', this.textContent)">Anthropology</button>
					<button class="subjectButton grey" onclick="goBack('socialStudiesSubjects')">Back</button>
				</div>
					<!-- Topics for History -->
					<div id="historyTopics" class="gone">
						<div class='heading'>History Topics</div>
						<button class="subjectButton red" onclick="selectStudy('ancientHistorySubtopics', this.textContent, true)">Ancient History</button>
						<button class="subjectButton green" onclick="selectStudy('medievalRenaissanceHistorySubtopics', this.textContent, true)">Medieval and Renaissance History</button>
						<button class="subjectButton blue" onclick="selectStudy('americanHistorySubtopics', this.textContent, true)">American History</button>
						<button class="subjectButton yellow" onclick="selectStudy('modernEuropeanHistorySubtopics', this.textContent, true)">Modern European History</button>
						<button class="subjectButton pink" onclick="selectStudy('worldWarsSubtopics', this.textContent, true)">World Wars</button>
						<button class="subjectButton orange" onclick="selectStudy('historyOfAsiaSubtopics', this.textContent, true)">History of Asia</button>
						<button class="subjectButton purple" onclick="selectStudy('africanHistorySubtopics', this.textContent, true)">African History</button>
						<button class="subjectButton teal" onclick="selectStudy('latinAmericanHistorySubtopics', this.textContent, true)">Latin American History</button>
						<button class="subjectButton grey" onclick="goBack('historyTopics')">Back</button>
					</div>
					<!-- Topics for Economics -->
					<div id="economicsTopics" class="gone">
						<div class='heading'>Economics Topics</div>
						<button class="subjectButton red" onclick="selectStudy('microeconomicsTopics', this.textContent)">Microeconomics</button>
						<button class="subjectButton green" onclick="selectStudy('macroeconomicsTopics', this.textContent)">Macroeconomics</button>
						<button class="subjectButton blue" onclick="selectStudy('internationalEconomicsTopics', this.textContent)">International Economics</button>
						<button class="subjectButton yellow" onclick="selectStudy('publicEconomicsTopics', this.textContent)">Public Economics</button>
						<button class="subjectButton pink" onclick="selectStudy('developmentEconomicsTopics', this.textContent)">Development Economics</button>
						<button class="subjectButton orange" onclick="selectStudy('behavioralEconomicsTopics', this.textContent)">Behavioral Economics</button>
						<button class="subjectButton purple" onclick="selectStudy('environmentalEconomicsTopics', this.textContent)">Environmental Economics</button>
						<button class="subjectButton teal" onclick="selectStudy('financialEconomicsTopics', this.textContent)">Financial Economics</button>
						<button class="subjectButton grey" onclick="goBack('economicsTopics')">Back</button>
					</div>
					<!-- Topics for Sociology -->
					<div id="sociologyTopics" class="gone">
						<div class='heading'>Sociology Topics</div>
						<button class="subjectButton red" onclick="selectStudy('introductionToSociologyTopics', this.textContent)">Introduction to Sociology</button>
						<button class="subjectButton green" onclick="selectStudy('socialStructuresInstitutionsTopics', this.textContent)">Social Structures and Institutions</button>
						<button class="subjectButton blue" onclick="selectStudy('socialStratificationTopics', this.textContent)">Social Stratification</button>
						<button class="subjectButton yellow" onclick="selectStudy('socialChangeDevelopmentTopics', this.textContent)">Social Change and Development</button>
						<button class="subjectButton pink" onclick="selectStudy('urbanSociologyTopics', this.textContent)">Urban Sociology</button>
						<button class="subjectButton orange" onclick="selectStudy('sociologyOfCultureTopics', this.textContent)">Sociology of Culture</button>
						<button class="subjectButton purple" onclick="selectStudy('sociologyOfHealthTopics', this.textContent)">Sociology of Health</button>
						<button class="subjectButton teal" onclick="selectStudy('criminologyTopics', this.textContent)">Criminology</button>
						<button class="subjectButton brown" onclick="selectStudy('sociologyOfWorkTopics', this.textContent)">Sociology of Work</button>
						<button class="subjectButton grey" onclick="goBack('sociologyTopics')">Back</button>
					</div>
					<!-- Topics for Geography -->
					<div id="geographyTopics" class="gone">
						<div class='heading'>Geography Topics</div>
						<button class="subjectButton red" onclick="selectStudy('usGeographyTopics', this.textContent)">US Geography</button>
						<button class="subjectButton green" onclick="selectStudy('europeanGeographyTopics', this.textContent)">European Geography</button>
						<button class="subjectButton blue" onclick="selectStudy('asianGeographyTopics', this.textContent)">Asian Geography</button>
						<button class="subjectButton yellow" onclick="selectStudy('africanGeographyTopics', this.textContent)">African Geography</button>
						<button class="subjectButton pink" onclick="selectStudy('southAmericanGeographyTopics', this.textContent)">South American Geography</button>
						<button class="subjectButton orange" onclick="selectStudy('australianGeographyTopics', this.textContent)">Australian Geography</button>
						<button class="subjectButton purple" onclick="selectStudy('polarRegionsTopics', this.textContent)">Polar Regions</button>
						<button class="subjectButton teal" onclick="selectStudy('topographicalGeographyTopics', this.textContent)">Topographical Geography</button>
						<button class="subjectButton grey" onclick="goBack('geographyTopics')">Back</button>
					</div>

					<!-- Topics for Political Science -->
					<div id="politicalScienceTopics" class="gone">
						<div class='heading'>Political Science Topics</div>
						<button class="subjectButton red" onclick="selectStudy('politicalTheoryTopics', this.textContent)">Political Theory</button>
						<button class="subjectButton green" onclick="selectStudy('comparativePoliticsTopics', this.textContent)">Comparative Politics</button>
						<button class="subjectButton blue" onclick="selectStudy('internationalRelationsTopics', this.textContent)">International Relations</button>
						<button class="subjectButton yellow" onclick="selectStudy('publicAdministrationTopics', this.textContent)">Public Administration</button>
						<button class="subjectButton pink" onclick="selectStudy('politicalEconomyTopics', this.textContent)">Political Economy</button>
						<button class="subjectButton orange" onclick="selectStudy('civilRightsLibertiesTopics', this.textContent)">Civil Rights and Liberties</button>
						<button class="subjectButton purple" onclick="selectStudy('electionsCampaignsTopics', this.textContent)">Elections and Campaigns</button>
						<button class="subjectButton teal" onclick="selectStudy('politicalParticipationTopics', this.textContent)">Political Participation</button>
						<button class="subjectButton grey" onclick="goBack('politicalScienceTopics')">Back</button>
					</div>
					<!-- Topics for Anthropology -->
					<div id="anthropologyTopics" class="gone">
						<div class='heading'>Anthropology Topics</div>
						<button class="subjectButton red" onclick="selectStudy('culturalAnthropologyTopics', this.textContent)">Cultural Anthropology</button>
						<button class="subjectButton green" onclick="selectStudy('archaeologyTopics', this.textContent)">Archaeology</button>
						<button class="subjectButton blue" onclick="selectStudy('biologicalAnthropologyTopics', this.textContent)">Biological Anthropology</button>
						<button class="subjectButton yellow" onclick="selectStudy('linguisticAnthropologyTopics', this.textContent)">Linguistic Anthropology</button>
						<button class="subjectButton pink" onclick="selectStudy('medicalAnthropologyTopics', this.textContent)">Medical Anthropology</button>
						<button class="subjectButton orange" onclick="selectStudy('anthropologyOfReligionTopics', this.textContent)">Anthropology of Religion</button>
						<button class="subjectButton purple" onclick="selectStudy('environmentalAnthropologyTopics', this.textContent)">Environmental Anthropology</button>
						<button class="subjectButton teal" onclick="selectStudy('urbanAnthropologyTopics', this.textContent)">Urban Anthropology</button>
						<button class="subjectButton grey" onclick="goBack('anthropologyTopics')">Back</button>
					</div>

					<!--------------------------------------------------------------------------------------------------------------
					
															History SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					
						<!-- Subtopics for Ancient History -->
						<div id="ancientHistorySubtopics" class="gone">
							<div class='heading'>Ancient History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('egyptianCivilizationSubtopic', this.textContent)">Egyptian Civilization</button>
							<button class="subjectButton green" onclick="selectStudy('mesopotamianCivilizationSubtopic', this.textContent)">Mesopotamian Civilization</button>
							<button class="subjectButton blue" onclick="selectStudy('ancientGreeceSubtopic', this.textContent)">Ancient Greece</button>
							<button class="subjectButton yellow" onclick="selectStudy('ancientRomeSubtopic', this.textContent)">Ancient Rome</button>
							<button class="subjectButton pink" onclick="selectStudy('ancientIndiaSubtopic', this.textContent)">Ancient India</button>
							<button class="subjectButton orange" onclick="selectStudy('ancientChinaSubtopic', this.textContent)">Ancient China</button>
							<button class="subjectButton purple" onclick="selectStudy('theAmericasSubtopic', this.textContent)">The Americas</button>
							<button class="subjectButton brown" onclick="selectStudy('ancientCivilizationsTest', this.textContent)">Ancient Civilizations Test</button>
							<button class="subjectButton grey" onclick="goBack('ancientHistorySubtopics')">Back</button>
						</div>
						<!-- Subtopics for Medieval and Renaissance History -->
						<div id="medievalRenaissanceHistorySubtopics" class="gone">
							<div class='heading'>Medieval and Renaissance History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('earlyMiddleAgesSubtopic', this.textContent)">The Early Middle Ages</button>
							<button class="subjectButton green" onclick="selectStudy('highMiddleAgesSubtopic', this.textContent)">The High Middle Ages</button>
							<button class="subjectButton blue" onclick="selectStudy('lateMiddleAgesSubtopic', this.textContent)">The Late Middle Ages</button>
							<button class="subjectButton yellow" onclick="selectStudy('italianRenaissanceSubtopic', this.textContent)">The Italian Renaissance</button>
							<button class="subjectButton pink" onclick="selectStudy('northernRenaissanceSubtopic', this.textContent)">The Northern Renaissance</button>
							<button class="subjectButton orange" onclick="selectStudy('renaissanceHumanismSubtopic', this.textContent)">Renaissance Humanism</button>
							<button class="subjectButton purple" onclick="selectStudy('scientificRevolutionSubtopic', this.textContent)">The Scientific Revolution</button>
							<button class="subjectButton brown" onclick="selectStudy('medievalRenaissanceHistoryTest', this.textContent)">Medieval and Renaissance History Test</button>
							<button class="subjectButton grey" onclick="goBack('medievalRenaissanceHistorySubtopics')">Back</button>
						</div>
						<!-- Subtopics for American History -->
						<div id="americanHistorySubtopics" class="gone">
							<div class='heading'>American History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('colonialAmericaSubtopic', this.textContent)">Colonial America</button>
							<button class="subjectButton green" onclick="selectStudy('revolutionaryWarSubtopic', this.textContent)">Revolutionary War</button>
							<button class="subjectButton blue" onclick="selectStudy('foundingUnitedStatesSubtopic', this.textContent)">The Founding of the United States</button>
							<button class="subjectButton yellow" onclick="selectStudy('westwardExpansionSubtopic', this.textContent)">Westward Expansion</button>
							<button class="subjectButton pink" onclick="selectStudy('civilWarReconstructionSubtopic', this.textContent)">Civil War and Reconstruction</button>
							<button class="subjectButton orange" onclick="selectStudy('industrializationProgressiveEraSubtopic', this.textContent)">Industrialization and the Progressive Era</button>
							<button class="subjectButton purple" onclick="selectStudy('greatDepressionWWIISubtopic', this.textContent)">The Great Depression and World War II</button>
							<button class="subjectButton teal" onclick="selectStudy('coldWarModernAmericaSubtopic', this.textContent)">The Cold War and Modern America</button>
							<button class="subjectButton brown" onclick="selectStudy('americanHistoryTest', this.textContent)">American History Test</button>
							<button class="subjectButton grey" onclick="goBack('americanHistorySubtopics')">Back</button>
						</div>
						<!-- Subtopics for Modern European History -->
						<div id="modernEuropeanHistorySubtopics" class="gone">
							<div class='heading'>Modern European History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('enlightenmentSubtopic', this.textContent)">The Enlightenment</button>
							<button class="subjectButton green" onclick="selectStudy('frenchRevolutionSubtopic', this.textContent)">The French Revolution</button>
							<button class="subjectButton blue" onclick="selectStudy('industrialRevolutionSubtopic', this.textContent)">Industrial Revolution</button>
							<button class="subjectButton yellow" onclick="selectStudy('worldWarsSubtopic', this.textContent)">The World Wars</button>
							<button class="subjectButton pink" onclick="selectStudy('coldWarSubtopic', this.textContent)">The Cold War</button>
							<button class="subjectButton orange" onclick="selectStudy('europeanIntegrationSubtopic', this.textContent)">European Integration</button>
							<button class="subjectButton purple" onclick="selectStudy('fallOfCommunismSubtopic', this.textContent)">The Fall of Communism</button>
							<button class="subjectButton teal" onclick="selectStudy('contemporaryIssuesSubtopic', this.textContent)">Contemporary Issues</button>
							<button class="subjectButton grey" onclick="goBack('modernEuropeanHistorySubtopics')">Back</button>
						</div>
						<!-- Subtopics for World Wars -->
						<div id="worldWarsSubtopics" class="gone">
							<div class='heading'>World Wars Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('causesWWISubtopic', this.textContent)">Causes of World War I</button>
							<button class="subjectButton green" onclick="selectStudy('majorBattlesWWISubtopic', this.textContent)">Major Battles of World War I</button>
							<button class="subjectButton blue" onclick="selectStudy('homeFrontWWISubtopic', this.textContent)">The Home Front and Total War</button>
							<button class="subjectButton yellow" onclick="selectStudy('treatyVersaillesSubtopic', this.textContent)">The Treaty of Versailles and Post-War Europe</button>
							<button class="subjectButton pink" onclick="selectStudy('causesWWIISubtopic', this.textContent)">Causes of World War II</button>
							<button class="subjectButton orange" onclick="selectStudy('majorBattlesWWIISubtopic', this.textContent)">Major Battles and Campaigns of World War II</button>
							<button class="subjectButton purple" onclick="selectStudy('holocaustWarCrimesSubtopic', this.textContent)">The Holocaust and War Crimes</button>
							<button class="subjectButton teal" onclick="selectStudy('atomicBombWWIIEndSubtopic', this.textContent)">The Atomic Bomb and the End of World War II</button>
							<button class="subjectButton brown" onclick="selectStudy('postWarReconstructionSubtopic', this.textContent)">Post-War Reconstruction and the United Nations</button>
							<button class="subjectButton grey" onclick="goBack('worldWarsSubtopics')">Back</button>
						</div>
						<!-- Subtopics for History of Asia -->
						<div id="historyOfAsiaSubtopics" class="gone">
							<div class='heading'>History of Asia Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('ancientCivilizationsAsiaSubtopic', this.textContent)">Ancient Civilizations</button>
							<button class="subjectButton green" onclick="selectStudy('imperialDynastiesAsiaSubtopic', this.textContent)">Imperial Dynasties</button>
							<button class="subjectButton blue" onclick="selectStudy('silkRoadAsiaSubtopic', this.textContent)">The Silk Road</button>
							<button class="subjectButton yellow" onclick="selectStudy('mongolEmpireAsiaSubtopic', this.textContent)">The Mongol Empire</button>
							<button class="subjectButton pink" onclick="selectStudy('colonialismAsiaSubtopic', this.textContent)">Colonialism in Asia</button>
							<button class="subjectButton orange" onclick="selectStudy('wwiiAsiaSubtopic', this.textContent)">World War II in Asia</button>
							<button class="subjectButton purple" onclick="selectStudy('coldWarAsiaSubtopic', this.textContent)">The Cold War in Asia</button>
							<button class="subjectButton teal" onclick="selectStudy('modernDevelopmentsAsiaSubtopic', this.textContent)">Modern Developments</button>
							<button class="subjectButton brown" onclick="selectStudy('historyOfAsiaTest', this.textContent)">History of Asia Test</button>
							<button class="subjectButton grey" onclick="goBack('historyOfAsiaSubtopics')">Back</button>
						</div>
						<!-- Subtopics for African History -->
						<div id="africanHistorySubtopics" class="gone">
							<div class='heading'>African History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('ancientCivilizationsAfricaSubtopic', this.textContent)">Ancient Civilizations</button>
							<button class="subjectButton green" onclick="selectStudy('medievalAfricaSubtopic', this.textContent)">Medieval Africa</button>
							<button class="subjectButton blue" onclick="selectStudy('colonialismImpactAfricaSubtopic', this.textContent)">Colonialism and Its Impact</button>
							<button class="subjectButton yellow" onclick="selectStudy('postIndependenceEraAfricaSubtopic', this.textContent)">Post-Independence Era</button>
							<button class="subjectButton pink" onclick="selectStudy('modernDayAfricaSubtopic', this.textContent)">Modern-Day Africa</button>
							<button class="subjectButton grey" onclick="goBack('africanHistorySubtopics')">Back</button>
						</div>
						<!-- Subtopics for Latin American History -->
						<div id="latinAmericanHistorySubtopics" class="gone">
							<div class='heading'>Latin American History Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('preColumbianCivilizationsSubtopic', this.textContent)">Pre-Columbian Civilizations</button>
							<button class="subjectButton green" onclick="selectStudy('colonialPeriodSubtopic', this.textContent)">Colonial Period</button>
							<button class="subjectButton blue" onclick="selectStudy('independenceMovementsSubtopic', this.textContent)">Independence Movements</button>
							<button class="subjectButton yellow" onclick="selectStudy('modernEraSubtopic', this.textContent)">Modern Era</button>
							<button class="subjectButton pink" onclick="selectStudy('contemporaryIssuesSubtopic', this.textContent)">Contemporary Issues</button>
							<button class="subjectButton grey" onclick="goBack('latinAmericanHistorySubtopics')">Back</button>
						</div>



