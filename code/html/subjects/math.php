		<!-- Topics for Math -->
				<div id="mathSubjects" class="gone">
					<div class='heading'>Math Subjects</div>
					<button class="subjectButton red" onclick="selectStudy('arithmeticTopics', this.textContent)">Arithmetic</button>
					<button class="subjectButton green" onclick="selectStudy('algebraTopics', this.textContent)">Algebra</button>
					<button class="subjectButton blue" onclick="selectStudy('geometryTopics', this.textContent)">Geometry</button>
					<button class="subjectButton yellow" onclick="selectStudy('calculusTopics', this.textContent)">Calculus</button>
					<button class="subjectButton pink" onclick="selectStudy('statisticsProbabilityTopics', this.textContent)">Statistics & Probability</button>
					<button class="subjectButton grey" onclick="goBack('mathSubjects')">Back</button>
				</div>
					<!-- Topics for Arithmetic -->
					<div id="arithmeticTopics" class="gone">
						<div class='heading'>Arithmetic Topics</div>
						<button class="subjectButton red" onclick="selectStudy('basicOperationsSubtopics', this.textContent, true)">Basic Operations</button>
						<button class="subjectButton green" onclick="selectStudy('fractionsSubtopics', this.textContent, true)">Fractions</button>
						<button class="subjectButton blue" onclick="selectStudy('decimalsSubtopics', this.textContent, true)">Decimals</button>
						<button class="subjectButton yellow" onclick="selectStudy('percentagesSubtopics', this.textContent, true)">Percentages</button>
						<button class="subjectButton pink" onclick="selectStudy('factorsMultiplesSubtopics', this.textContent)">Factors & Multiples</button>
						<button class="subjectButton orange" onclick="selectStudy('ratiosProportionsSubtopics', this.textContent)">Ratios & Proportions</button>
						<button class="subjectButton purple" onclick="selectStudy('numberPropertiesSubtopics', this.textContent)">Number Properties</button>
						<button class="subjectButton grey" onclick="goBack('arithmeticTopics')">Back</button>
					</div>
					<!-- Topics for Algebra -->
					<div id="algebraTopics" class="gone">
						<div class='heading'>Algebra Topics</div>
						<button class="subjectButton red" onclick="selectStudy('expressionsEquationsSubtopics', this.textContent, false)">Expressions & Equations</button>
						<button class="subjectButton green" onclick="selectStudy('inequalitiesSubtopics', this.textContent, false)">Inequalities</button>
						<button class="subjectButton blue" onclick="selectStudy('functionsSubtopics', this.textContent, false)">Functions</button>
						<button class="subjectButton yellow" onclick="selectStudy('graphingSubtopics', this.textContent, false)">Graphing</button>
						<button class="subjectButton pink" onclick="selectStudy('polynomialsSubtopics', this.textContent, false)">Polynomials</button>
						<button class="subjectButton orange" onclick="selectStudy('systemsEquationsSubtopics', this.textContent, false)">Systems of Equations</button>
						<button class="subjectButton purple" onclick="selectStudy('quadraticEquationsSubtopics', this.textContent, false)">Quadratic Equations</button>
						<button class="subjectButton teal" onclick="selectStudy('exponentsRadicalsSubtopics', this.textContent, false)">Exponents & Radicals</button>
						<button class="subjectButton grey" onclick="goBack('algebraTopics')">Back</button>
					</div>
					<!-- Topics for Geometry -->
					<div id="geometryTopics" class="gone">
						<div class='heading'>Geometry Topics</div>
						<button class="subjectButton red" onclick="selectStudy('basicShapesSubtopics', this.textContent)">Basic Geometric Shapes</button>
						<button class="subjectButton green" onclick="selectStudy('propertiesShapesSubtopics', this.textContent)">Properties of Shapes</button>
						<button class="subjectButton blue" onclick="selectStudy('perimeterAreaSubtopics', this.textContent)">Perimeter and Area</button>
						<button class="subjectButton yellow" onclick="selectStudy('volumeSurfaceAreaSubtopics', this.textContent)">Volume and Surface Area</button>
						<button class="subjectButton pink" onclick="selectStudy('coordinateGeometrySubtopics', this.textContent)">Coordinate Geometry</button>
						<button class="subjectButton orange" onclick="selectStudy('transformationsSubtopics', this.textContent)">Transformations</button>
						<button class="subjectButton purple" onclick="selectStudy('congruenceSimilaritySubtopics', this.textContent)">Congruence and Similarity</button>
						<button class="subjectButton teal" onclick="selectStudy('trigonometrySubtopics', this.textContent)">Trigonometry</button>
						<button class="subjectButton brown" onclick="selectStudy('geometricProofsSubtopics', this.textContent)">Geometric Proofs</button>
						<button class="subjectButton grey" onclick="goBack('geometryTopics')">Back</button>
					</div>
					<!-- Topics for Calculus -->
					<div id="calculusTopics" class="gone">
						<div class='heading'>Calculus Topics</div>
						<button class="subjectButton red" onclick="selectStudy('limitsContinuitySubtopics', this.textContent)">Limits and Continuity</button>
						<button class="subjectButton green" onclick="selectStudy('differentialCalculusSubtopics', this.textContent)">Differential Calculus</button>
						<button class="subjectButton blue" onclick="selectStudy('integralCalculusSubtopics', this.textContent)">Integral Calculus</button>
						<button class="subjectButton yellow" onclick="selectStudy('sequencesSeriesSubtopics', this.textContent)">Sequences and Series</button>
						<button class="subjectButton pink" onclick="selectStudy('applicationsCalculusSubtopics', this.textContent)">Applications of Calculus</button>
						<button class="subjectButton orange" onclick="selectStudy('multivariableCalculusSubtopics', this.textContent)">Multivariable Calculus</button>
						<button class="subjectButton purple" onclick="selectStudy('differentialEquationsSubtopics', this.textContent)">Differential Equations</button>
						<button class="subjectButton grey" onclick="goBack('calculusTopics')">Back</button>
					</div>
					<!-- Topics for Statistics & Probability -->
					<div id="statisticsProbabilityTopics" class="gone">
						<div class='heading'>Statistics & Probability Topics</div>
						<button class="subjectButton red" onclick="selectStudy('basicStatisticsSubtopics', this.textContent)">Basic Statistics</button>
						<button class="subjectButton green" onclick="selectStudy('probabilitySubtopics', this.textContent)">Probability</button>
						<button class="subjectButton blue" onclick="selectStudy('combinatoricsSubtopics', this.textContent)">Combinatorics</button>
						<button class="subjectButton yellow" onclick="selectStudy('randomVariablesDistributionsSubtopics', this.textContent)">Random Variables and Distributions</button>
						<button class="subjectButton pink" onclick="selectStudy('statisticalInferenceSubtopics', this.textContent)">Statistical Inference</button>
						<button class="subjectButton orange" onclick="selectStudy('regressionCorrelationSubtopics', this.textContent)">Regression and Correlation</button>
						<button class="subjectButton purple" onclick="selectStudy('designExperimentsSurveysSubtopics', this.textContent)">Design of Experiments and Surveys</button>
						<button class="subjectButton teal" onclick="selectStudy('applicationsStatisticsSubtopics', this.textContent)">Applications of Statistics</button>
						<button class="subjectButton grey" onclick="goBack('statisticsProbabilityTopics')">Back</button>
					</div>
					
					<!--------------------------------------------------------------------------------------------------------------
					
															Basic Operations SUBSECTIONS
					
					-------------------------------------------------------------------------------------------------------------->
					
						<!-- Subtopics for Basic Operations -->
						<div id="basicOperationsSubtopics" class="gone">
							<div class='heading'>Basic Operations Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('additionSubtopic', this.textContent)">Addition</button>
							<button class="subjectButton green" onclick="selectStudy('subtractionSubtopic', this.textContent)">Subtraction</button>
							<button class="subjectButton blue" onclick="selectStudy('multiplicationSubtopic', this.textContent)">Multiplication</button>
							<button class="subjectButton yellow" onclick="selectStudy('divisionSubtopic', this.textContent)">Division</button>
							<button class="subjectButton pink" onclick="selectStudy('basicOperationsTest', this.textContent)">Basic Operations Test</button>
							<button class="subjectButton grey" onclick="goBack('basicOperationsSubtopics')">Back</button>
						</div>
						<!-- Subtopics for Fractions -->
						<div id="fractionsSubtopics" class="gone">
							<div class='heading'>Fractions Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('understandingFractionsSubtopic', this.textContent)">Understanding Fractions</button>
							<button class="subjectButton green" onclick="selectStudy('operationsFractionsSubtopic', this.textContent)">Operations with Fractions</button>
							<button class="subjectButton blue" onclick="selectStudy('comparingOrderingFractionsSubtopic', this.textContent)">Comparing & Ordering Fractions</button>
							<button class="subjectButton yellow" onclick="selectStudy('convertingFractionsSubtopic', this.textContent)">Converting Fractions</button>
							<button class="subjectButton pink" onclick="selectStudy('simplifyingFractionsSubtopic', this.textContent)">Simplifying Fractions</button>
							<button class="subjectButton orange" onclick="selectStudy('fractionWordProblemsSubtopic', this.textContent)">Fraction Word Problems</button>
							<button class="subjectButton brown" onclick="selectStudy('fractionsTest', this.textContent)">Fractions Test</button>
							<button class="subjectButton grey" onclick="goBack('fractionsSubtopics')">Back</button>
						</div>
						<!-- Subtopics for Decimals -->
						<div id="decimalsSubtopics" class="gone">
							<div class='heading'>Decimals Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('understandingDecimalsSubtopic', this.textContent)">Understanding Decimals</button>
							<button class="subjectButton green" onclick="selectStudy('operationsDecimalsSubtopic', this.textContent)">Operations with Decimals</button>
							<button class="subjectButton blue" onclick="selectStudy('convertingFractionsDecimalsSubtopic', this.textContent)">Converting Between Fractions and Decimals</button>
							<button class="subjectButton yellow" onclick="selectStudy('roundingEstimatingDecimalsSubtopic', this.textContent)">Rounding and Estimating Decimals</button>
							<button class="subjectButton pink" onclick="selectStudy('comparingOrderingDecimalsSubtopic', this.textContent)">Comparing & Ordering Decimals</button>
							<button class="subjectButton orange" onclick="selectStudy('decimalWordProblemsSubtopic', this.textContent)">Decimal Word Problems</button>
							<button class="subjectButton brown" onclick="selectStudy('decimalsTest', this.textContent)">Decimals Test</button>
							<button class="subjectButton grey" onclick="goBack('decimalsSubtopics')">Back</button>
						</div>
						<!-- Subtopics for Percentages -->
						<div id="percentagesSubtopics" class="gone">
							<div class='heading'>Percentages Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('understandingPercentagesSubtopic', this.textContent)">Understanding Percentages</button>
							<button class="subjectButton green" onclick="selectStudy('calculatingPercentagesSubtopic', this.textContent)">Calculating Percentages</button>
							<button class="subjectButton blue" onclick="selectStudy('percentageIncreaseDecreaseSubtopic', this.textContent)">Percentage Increase and Decrease</button>
							<button class="subjectButton yellow" onclick="selectStudy('percentagesRealLifeSubtopic', this.textContent)">Percentages in Real Life</button>
							<button class="subjectButton pink" onclick="selectStudy('convertingPercentagesSubtopic', this.textContent)">Converting Between Percentages, Fractions, and Decimals</button>
							<button class="subjectButton orange" onclick="selectStudy('percentageWordProblemsSubtopic', this.textContent)">Percentage Word Problems</button>
							<button class="subjectButton brown" onclick="selectStudy('percentagesTest', this.textContent)">Percentages Test</button>
							<button class="subjectButton grey" onclick="goBack('percentagesSubtopics')">Back</button>
						</div>
						<!-- Subtopics for Ratios & Proportions -->
						<div id="ratiosProportionsSubtopics" class="gone">
							<div class='heading'>Ratios & Proportions Subtopics</div>
							<button class="subjectButton red" onclick="selectStudy('understandingRatiosSubtopic', this.textContent)">Understanding Ratios</button>
							<button class="subjectButton green" onclick="selectStudy('solvingProportionsSubtopic', this.textContent)">Solving Proportions</button>
							<button class="subjectButton blue" onclick="selectStudy('ratiosProportionsRealLifeSubtopic', this.textContent)">Applications in Real Life</button>
							<button class="subjectButton yellow" onclick="selectStudy('directInverseProportionSubtopic', this.textContent)">Direct and Inverse Proportionality</button>
							<button class="subjectButton pink" onclick="selectStudy('ratiosRatesProblemsSubtopic', this.textContent)">Ratios and Rates in Practical Problems</button>
							<button class="subjectButton orange" onclick="selectStudy('graphicalRepresentationRatiosSubtopic', this.textContent)">Graphical Representation of Ratios</button>
							<button class="subjectButton brown" onclick="selectStudy('ratiosProportionsTest', this.textContent)">Ratios & Proportions Test</button>
							<button class="subjectButton grey" onclick="goBack('ratiosProportionsSubtopics')">Back</button>
						</div>

