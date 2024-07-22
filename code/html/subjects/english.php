		<!-- Topics for English -->
				<div id="englishSubjects" class="gone">
					<div class='heading'>English Subjects</div>
					<button class="subjectButton red" onclick="selectStudy('readingTopics', this.textContent)">Reading</button>
					<button class="subjectButton green" onclick="selectStudy('writingTopics', this.textContent)">Writing</button>
					<button class="subjectButton blue" onclick="selectStudy('poetryTopics', this.textContent)">Poetry</button>
					<button class="subjectButton yellow" onclick="selectStudy('dramaTopics', this.textContent)">Drama</button>
					<button class="subjectButton pink" onclick="selectStudy('languageArtsTopics', this.textContent)">Language Arts</button>
					<button class="subjectButton grey" onclick="goBack('englishSubjects')">Back</button>
				</div>
					<!-- Topics for Reading -->
					<div id="readingTopics" class="gone">
						<div class='heading'>Reading Topics</div>
						<button class="subjectButton red" onclick="selectStudy('authorsPurposeTopic', this.textContent)">Author's Purpose</button>
						<button class="subjectButton purple" onclick="selectStudy('genreSubgenreTopic', this.textContent)">Genre and Subgenre</button>
						<button class="subjectButton teal" onclick="selectStudy('contextCluesTopic', this.textContent)">Context Clues</button>
						<button class="subjectButton green" onclick="selectStudy('elementsOfFictionTopic', this.textContent)">Elements of Fiction</button>
						<button class="subjectButton blue" onclick="selectStudy('makingPredictionsTopic', this.textContent)">Making Predictions</button>
						<button class="subjectButton orange" onclick="selectStudy('moodToneTopic', this.textContent)">Mood and Tone</button>
						<button class="subjectButton yellow" onclick="selectStudy('pointOfViewTopic', this.textContent)">Point of View</button>
						<button class="subjectButton pink" onclick="selectStudy('textStructureTopic', this.textContent)">Text Structure</button>
						<button class="subjectButton brown" onclick="selectStudy('readingTest', this.textContent)">Reading Test</button>
						<button class="subjectButton grey" onclick="goBack('readingTopics')">Back</button>
					</div>

					<!-- Topics for Writing -->
					<div id="writingTopics" class="gone">
						<div class='heading'>Writing Topics</div>
						<button class="subjectButton red" onclick="selectStudy('narrativeWritingTopic', this.textContent)">Narrative Writing</button>
						<button class="subjectButton green" onclick="selectStudy('persuasiveWritingTopic', this.textContent)">Persuasive Writing</button>
						<button class="subjectButton blue" onclick="selectStudy('expositoryWritingTopic', this.textContent)">Expository Writing</button>
						<button class="subjectButton yellow" onclick="selectStudy('researchWritingTopic', this.textContent)">Research Writing</button>
						<button class="subjectButton pink" onclick="selectStudy('descriptiveWritingTopic', this.textContent)">Descriptive Writing</button>
						<button class="subjectButton orange" onclick="selectStudy('technicalWritingTopic', this.textContent)">Technical Writing</button>
						<button class="subjectButton purple" onclick="selectStudy('creativeWritingTopic', this.textContent)">Creative Writing</button>
						<button class="subjectButton brown" onclick="selectStudy('writingTest', this.textContent)">Writing Test</button>
						<button class="subjectButton grey" onclick="goBack('writingTopics')">Back</button>
					</div>

					<!-- Topics for Poetry -->
					<div id="poetryTopics" class="gone">
						<div class='heading'>Poetry Topics</div>
						<button class="subjectButton red" onclick="selectStudy('figurativeLanguageTopic', this.textContent)">Figurative Language</button>
						<button class="subjectButton green" onclick="selectStudy('poeticDevicesTopic', this.textContent)">Poetic Devices</button>
						<button class="subjectButton blue" onclick="selectStudy('poeticStructureTopic', this.textContent)">Poetic Structure</button>
						<button class="subjectButton yellow" onclick="selectStudy('interpretingPoetryTopic', this.textContent)">Interpreting Poetry</button>
					    <button class="subjectButton pink" onclick="selectStudy('poetryFormsTopic', this.textContent)">Poetry Forms</button>
					    <button class="subjectButton brown" onclick="selectStudy('poetryTest', this.textContent)">Poetry Test</button>
						<button class="subjectButton grey" onclick="goBack('poetryTopics')">Back</button>
					</div>
					<!-- Topics for Drama -->
					<div id="dramaTopics" class="gone">
						<div class='heading'>Drama Topics</div>
						<button class="subjectButton red" onclick="selectStudy('dramaFormsTopic', this.textContent)">Forms of Drama</button>
						<button class="subjectButton green" onclick="selectStudy('dramaElementsTopic', this.textContent)">Elements of Drama</button>
						<button class="subjectButton blue" onclick="selectStudy('dramaTechniquesTopic', this.textContent)">Dramatic Techniques</button>
						<button class="subjectButton yellow" onclick="selectStudy('theatreProductionTopic', this.textContent)">Theatre Production</button>
						<button class="subjectButton pink" onclick="selectStudy('scriptAnalysisTopic', this.textContent)">Script Analysis</button>
						<button class="subjectButton brown" onclick="selectStudy('dramaTest', this.textContent)">Drama Test</button>
						<button class="subjectButton grey" onclick="goBack('dramaTopics')">Back</button>
					</div>
					
					<!--------------------------------------------------------------------------------------------------------------
					
															LANGUAGE ARTS SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					
					<!-- Topics for Language Arts -->
					<div id="languageArtsTopics" class="gone">
						<div class='heading'>Language Arts Topics</div>
						<button class="subjectButton red" onclick="selectStudy('partsOfSpeechSubtopics', this.textContent, true)">Parts of Speech</button>
						<button class="subjectButton green" onclick="selectStudy('sentenceStructureSubtopics', this.textContent, true)">Sentence Structure</button>
						<button class="subjectButton blue" onclick="selectStudy('grammarUsageSubtopics', this.textContent, true)">Grammar Usage</button>
						<button class="subjectButton yellow" onclick="selectStudy('punctuationSubtopics', this.textContent, true)">Punctuation</button>
						<button class="subjectButton grey" onclick="goBack('languageArtsTopics')">Back</button>
					</div>
						<!-- Subtopics For Parts of Speech -->
						<div id="partsOfSpeechSubtopics" class="gone">
							<div class='heading'>Parts of Speech Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('nounsSubtopic', this.textContent, false)">Nouns</button>
							<button class="subjectButton green" onclick="selectStudy('verbsSubtopic', this.textContent, false)">Verbs</button>
							<button class="subjectButton blue" onclick="selectStudy('pronounsSubtopic', this.textContent, false)">Pronouns</button>
							<button class="subjectButton yellow" onclick="selectStudy('adjectivesSubtopic', this.textContent, false)">Adjectives</button>
							<button class="subjectButton pink" onclick="selectStudy('adverbsSubtopic', this.textContent, false)">Adverbs</button>
							<button class="subjectButton orange" onclick="selectStudy('prepositionsSubtopic', this.textContent, false)">Prepositions</button>
							<button class="subjectButton purple" onclick="selectStudy('conjunctionsSubtopic', this.textContent, false)">Conjunctions</button>
							<button class="subjectButton teal" onclick="selectStudy('interjectionsSubtopic', this.textContent, false)">Interjections</button>
							<button class="subjectButton brown" onclick="selectStudy('partsOfSpeechTest', this.textContent, false)">Parts of Speech Test</button>
							<button class="subjectButton grey" onclick="goBack('partsOfSpeechSubtopics')">Back</button>
						</div>

						<!-- Subtopics for Sentence Structure -->
						<div id="sentenceStructureSubtopics" class="gone">
							<div class='heading'>Sentence Structure Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('subjectSubtopic', this.textContent)">Subjects</button>
							<button class="subjectButton green" onclick="selectStudy('predicateSubtopic', this.textContent)">Predicates</button>
							<button class="subjectButton blue" onclick="selectStudy('clauseSubtopic', this.textContent)">Clauses</button>
							<button class="subjectButton yellow" onclick="selectStudy('simpleSentenceSubtopic', this.textContent)">Simple Sentences</button>
							<button class="subjectButton pink" onclick="selectStudy('compoundSentenceSubtopic', this.textContent)">Compound Sentences</button>
							<button class="subjectButton orange" onclick="selectStudy('complexSentenceSubtopic', this.textContent)">Complex Sentences</button>
							<button class="subjectButton purple" onclick="selectStudy('compoundComplexSentenceSubtopic', this.textContent)">Compound-Complex Sentences</button>
							<button class="subjectButton teal" onclick="selectStudy('phraseTypesSubtopic', this.textContent)">Phrase Types</button>
							<button class="subjectButton brown" onclick="selectStudy('sentenceStructureTest', this.textContent)">Sentence Structure Test</button>
							<button class="subjectButton grey" onclick="goBack('sentenceStructureSubtopics')">Back</button>
						</div>
						
						<!-- Subtopics for Grammar Usage -->
						<div id="grammarUsageSubtopics" class="gone">
							<div class='heading'>Grammar Usage Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('wasVsWereSubtopic', this.textContent, false)">Was vs. Were</button>
							<button class="subjectButton green" onclick="selectStudy('affectVsEffectSubtopic', this.textContent, false)">Affect vs. Effect</button>
							<button class="subjectButton blue" onclick="selectStudy('layVsLieSubtopic', this.textContent, false)">Lay vs. Lie</button>
							<button class="subjectButton yellow" onclick="selectStudy('thereTheirTheyreSubtopic', this.textContent, false)">There, Their, & They're</button>
							<button class="subjectButton pink" onclick="selectStudy('yourVsYoureSubtopic', this.textContent, false)">Your vs. You're</button>
							<button class="subjectButton orange" onclick="selectStudy('lessVsFewerSubtopic', this.textContent, false)">Less vs. Fewer</button>
							<button class="subjectButton purple" onclick="selectStudy('thanVsThenSubtopic', this.textContent, false)">Than vs. Then</button>
							<button class="subjectButton teal" onclick="selectStudy('meVsISubtopic', this.textContent, false)">Me vs. I</button>
							<button class="subjectButton brown" onclick="selectStudy('grammarTest', this.textContent, false)">Grammar Test</button>
							<button class="subjectButton grey" onclick="goBack('grammarUsageSubtopics')">Back</button>
						</div>

						<!-- Subtopics for Punctuation -->
						<div id="punctuationSubtopics" class="gone">
							<div class='heading'>Punctuation Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('commasSubtopic', this.textContent, false)">Commas</button>
							<button class="subjectButton green" onclick="selectStudy('periodsSubtopic', this.textContent, false)">Periods</button>
							<button class="subjectButton blue" onclick="selectStudy('questionMarksSubtopic', this.textContent, false)">Question Marks</button>
							<button class="subjectButton yellow" onclick="selectStudy('exclamationPointsSubtopic', this.textContent, false)">Exclamation Points</button>
							<button class="subjectButton pink" onclick="selectStudy('colonsAndSemicolonsSubtopic', this.textContent, false)">Colons and Semicolons</button>
							<button class="subjectButton orange" onclick="selectStudy('dashesAndHyphensSubtopic', this.textContent, false)">Dashes and Hyphens</button>
							<button class="subjectButton purple" onclick="selectStudy('quotationMarksSubtopic', this.textContent, false)">Quotation Marks</button>
							<button class="subjectButton teal" onclick="selectStudy('apostrophesSubtopic', this.textContent, false)">Apostrophes</button>
							<button class="subjectButton brown" onclick="selectStudy('punctuationTest', this.textContent, false)">Punctuation Test</button>
							<button class="subjectButton grey" onclick="goBack('punctuationSubtopics')">Back</button>
						</div>


					<!--------------------------------------------------------------------------------------------------------------
					
															LANGUAGE ARTS SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->

