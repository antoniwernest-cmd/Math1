MATH LANDING - DEPLOYMENT FILES

1. Open the Math-Landing-Deployment folder. No extraction is needed.
2. index.html is directly inside it, beside app.js,
   styles.css, assets, screens and catalog.
3. Upload the entire Math-Landing-Deployment folder to your static website host.
   On Netlify manual deploy, drop this folder into the deploy area.
   If the host asks for a publish directory, select this folder.
   No build command, installation or server code is required.
4. Open the published website and choose a rover ID and grade.

Keep all included files and subfolders together. The catalogue parts are needed
for the complete Excel catalogue download; screenshots are used by exports.
The folder includes both Excite and Inspire, all question engines, illustrations,
rover IDs, fonts, homework, classwork, calendars and PNG/Excel/PDF export tools.
Weekly calendars and work catalogues are generated from the website's buttons.
Homework October 26-30 is below October 19-23 in the left sidebar. Each path
has 12 homework questions per day for both Excite and Inspire.
Each day starts with a calendar question and includes four rounding questions
using varied tools. Other questions vary across both weeks; saved work is kept.
The small wheel beside October 26-30 opens a teacher preview with code 5160.
It lasts only in that tab until End teacher preview or a reload. Parents still
see the preparing-homework message until the scheduled release.

Choose a homework or classwork day and press Day Excel to save that day's
student work, PNGs and assessments. Classwork Day Excel includes all four sets.
Each portrait page keeps one question PNG and its assessment together.
Assess class set lets the teacher choose any day, set and question. Assess on
a question page opens its teacher record. Each assessment save or override
requires code 259. Set Excel inside the assessment dialog exports only that set.

Page 20 of every class set has a large red I am done - call my teacher button.
The student presses it to open Rocky and Luna's reminder and stays on page 20.
In this pop-up, enter teacher export code 259 and press Set Excel - PNGs +
assessment to save only that learner's selected set. Open Excel to print it.

The last page of homework (12 for both paths on October 26-30) and page 20 of classwork
has a large blue Check my results button. Finish that page and check the work
first. It pulses when ready and opens results for that day or set.
Tap a numbered result to review its question, or stay on the last page.

The student toolbar is simplified. Open Grown-ups for curriculum expectations,
assessment, printing, calendars, PNG/Excel catalogues and Save / help.
On a selected day, This week's work contains Day Excel and class-set assessment.
The maths models, answer controls, undo, check button and progress stay visible.

The separate index.html outside this folder is the complete offline entry file,
equivalent to Math-Landing.html. For deployment, use the index.html INSIDE the
Math-Landing-Deployment folder together with all its assets.

Saved student work and teacher edit notes stay in the browser where entered.
Before moving to a new website address, use Save / help to download a project
backup, then restore it on the new address if you want to keep that work.
Personal browser records and teacher audit comments are not in this folder.

OCTOBER 24 UPDATES
The project uses bundled Andika fonts, including activity frames and offline use.
All Ontario strands are shown together: A Math learning skills, B Number,
C Algebra, D Data management, E1 Geometry, E2 Measurement, and F Financial
literacy. Geometry and Measurement are separate cards within Spatial Sense.
Homework and Classwork remain in the sidebar. Each class has eight playable starter questions for Data, Geometry,
Measurement, and Financial Literacy (64 new questions altogether). Math learning
skills open an overview for use across all content strands.

October 26-30 homework keeps 12 questions a day in both classes. Two existing
non-rounding questions are replaced each day by one regrouping and one
ungrouping activity. The other ten questions, including all four rounding
questions, are unchanged. All original question pages remain in the bank.

Teacher audit code 5160 unlocks the bottom audit toolbar on every screen.
Screen PNG saves and previews the current screen. Press Edit to open the editing screen immediately. Save your
notes to include that screen in the audit. Print audit downloads
Math-Landing-Teacher-Audit-PNGs.xlsx, with three PNGs per landscape page and
notes beside each image. The downloaded dialog also offers Print preview.
Printing is hidden until teacher audit is unlocked; homework preview alone
does not unlock it. Missing PNGs are refreshed automatically from their recorded pages before
exporting, then the original screen and rover are restored. If a source page
is unavailable, the export identifies it. No flagged page is silently omitted.

For native Excel to open automatically, the browser must be configured to
always open downloaded .xlsx files. In Edge, use the downloaded workbook
menu and select Always open files of this type. This is a setting for that
browser on that computer.

Keep capture-images.js beside index.html. It supplies embedded versions of
project illustrations to prevent local-file PNG exports from becoming tainted.
The homework PNG catalogue is in the sibling Homework-Catalogue folder;
it contains 120 PNGs, six per landscape page, with thick black borders.

October 25 updates
Andika is bundled for offline use throughout the shell and all 65 activity engines. Andika Regular and Bold were also installed for this Windows user.
PNG catalogue exports, screen PNGs and activity printing require the 5160 teacher override. The catalogue dialog includes Full project catalogue by strand, with class and strand scope.
Audit edit messages include separate marks and raised button feedback. Choose me for homework and Choose me for classwork are independent assignment selections. Reset audit clears both selections and resets print/Excel counts.
Weekly review Excel keeps the original 120 tabs and adds orange tabs for shared structures across classes/days. The original Monday tabs remain black. All review tabs have native Excel checkboxes and Notes.
Halloween includes two assessed map activities per grade. It is separate from homework. Ten-frames have individual disc taps plus Fill all 10 / Clear 10 controls.

PERMANENT PAGE CODES — OCTOBER 25
Every activity has a permanent strand/grade code with four digits, such as NS2-0001 or NS3-0001. Codes appear at the lower-right of activities and menus, on PNG catalogues, in teacher audit records and assessment exports. Enter a code in Find an activity, or use index.html?code=NS2-0001.
NS = Number sense; OP = Operations; PA = Patterns and algebra; DM = Data management; GE = Geometry; ME = Measurement; FL = Financial literacy; LS = Math learning skills. UI, HW and CW identify navigation screens. The middle number is the grade; 0 is used for shared navigation.
The permanent mappings are in page-code-registry.json and embedded in page-codes.js for offline use. Never renumber, delete or reuse mappings. Append new IDs only. Assignment moves and curriculum changes preserve the code. The maintenance script work/update-page-codes.mjs adds missing mappings and checks uniqueness without changing assigned codes.

ORANGE G TAB EDITS — OCTOBER 25
Applied 11 edited structure groups from the teacher workbook to 57 matching weekly pages, preserving all question IDs and 12 questions per day for each class. Changes include whole-word answer buttons, unique ten-frame targets, proportional blocks and Number pad instructions, larger workshop tools, block pictures and immediate decomposition models, six-card ordering for Excite, multi-place subtraction, matching-group addition, and descriptive rounding labels. The addition example 8 + 5 correctly becomes 5 + 5 + 3.
The audit checklist now includes Add edit notes to a tick box. The weekly workbook has 120 original question tabs plus 20 orange shared-structure tabs, with 35 native tick boxes on each review tab.

TEACHER AUDIT 8 — OCTOBER 25
Applied the current workbook edits through the existing engines. Ten-frames include Colour 5 / Clear 5, full-frame fill and individual disc taps. The audit checklist groups size and overlap together and adds teacher instructions, teacher favourites and Return to Extra practice.
Three assignment replacements keep 12 questions per day: new four-representation activities for both grades on Wednesday, and an existing equal-groups builder replaces Inspire Friday rink design. Removed pages remain in Extra practice with their original IDs, saved work and permanent codes.
The separate right-hand number pad has been removed throughout the project. Answer choices and any required local input stay beside their models. All native checking/saving procedures are retained.
Rocky and Luna each have three fall outfits that vary by page. Halloween retains the Dracula and Frankenstein costumes. Seasonal assets are saved in assets/autumn/ and the ordering illustration in assets/audit-oct25-v8/.
