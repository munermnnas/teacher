const levelFromScore = (score) => {
  if (score >= 4.5) return 'excellent'
  if (score >= 3.5) return 'good'
  if (score >= 2.5) return 'average'
  if (score >= 1.5) return 'poor'
  return 'veryPoor'
}

const adviceData = {
  classroomManagement: {
    excellent: {
      titleAr: 'إدارة صف متميزة',
      titleEn: 'Outstanding Classroom Management',
      analysisAr: 'يعكس التقييم التزاماً قوياً بإدارة الصف بفعالية مع انضباط واضح وأجواء منظمة.',
      analysisEn: 'The score reflects a strong commitment to effective classroom management with clear discipline and structure.',
      tipsAr: [
        'استمر في استخدام استراتيجيات الانضباط الإيجابي لبناء بيئة داعمة.',
        'شارك أفضل ممارساتك مع الزملاء لدعم ثقافة المدرسة.',
        'احتفظ بسجل لأدوات الإدارة الناجحة لاستخدامها في تدريبات مستقبلية.',
      ],
      tipsEn: [
        'Continue leveraging positive discipline strategies to build a supportive climate.',
        'Share your best practices with colleagues to strengthen school culture.',
        'Document effective management tools for future training sessions.',
      ],
    },
    good: {
      titleAr: 'إدارة صف قوية',
      titleEn: 'Strong Classroom Management',
      analysisAr: 'المؤشرات إيجابية، ومع بعض التعديلات يمكن الوصول إلى مستوى التميز في جميع الدروس.',
      analysisEn: 'Indicators are positive and, with minor tweaks, excellence across all lessons is within reach.',
      tipsAr: [
        'عزز الاتساق في تطبيق القواعد حتى في الحصص المزدحمة.',
        'تابع قياس وقت الأنشطة لضمان بقاء الطلاب في المسار الصحيح.',
        'استخدم استراتيجيات متنوعة للحفاظ على تركيز الطلبة لفترات أطول.',
      ],
      tipsEn: [
        'Increase consistency in applying rules even during busy periods.',
        'Monitor activity timing to keep students on task.',
        'Use varied strategies to sustain student focus for longer periods.',
      ],
    },
    average: {
      titleAr: 'إدارة صف متوسطة',
      titleEn: 'Developing Classroom Management',
      analysisAr: 'الأساس موجود، لكن بعض جوانب التنظيم تحتاج دعماً إضافياً للحفاظ على الانضباط.',
      analysisEn: 'Solid foundations are present, yet some organizational aspects need support to maintain discipline.',
      tipsAr: [
        'راجع قواعد الصف مع الطلاب بشكل دوري لتعزيز الالتزام.',
        'استخدم إشارات بصرية أو صوتية للتذكير بالوقت والمهمات.',
        'خطط مسبقاً لاستراتيجيات التعامل مع السلوكيات غير المرغوبة.',
      ],
      tipsEn: [
        'Revisit classroom norms with students regularly to strengthen buy-in.',
        'Use visual or auditory cues to remind students about time and tasks.',
        'Pre-plan strategies for addressing off-task or disruptive behaviors.',
      ],
    },
    poor: {
      titleAr: 'إدارة صف بحاجة إلى تحسين',
      titleEn: 'Improvement Needed in Classroom Management',
      analysisAr: 'يوجد تحديات واضحة في الانضباط ويجب تطوير إجراءات أكثر فاعلية للحفاظ على النظام.',
      analysisEn: 'Noticeable discipline challenges exist and more effective procedures are needed to maintain order.',
      tipsAr: [
        'ضع قواعد صفية واضحة مع عواقب محددة وشاركها مع الطلبة.',
        'استخدم بطاقات أو عقود سلوكية لمتابعة التقدم والانضباط.',
        'اطلب الدعم من مشرف أو زميل لحضور الدروس وتقديم ملاحظات.',
      ],
      tipsEn: [
        'Create clear classroom rules with defined consequences and share them with students.',
        'Use behavior contracts or tracking tools to monitor progress.',
        'Seek support from a mentor or supervisor to observe classes and offer feedback.',
      ],
    },
    veryPoor: {
      titleAr: 'إدارة صف حرجة',
      titleEn: 'Critical Classroom Management Concerns',
      analysisAr: 'البيئة الصفية تعاني من فوضى مستمرة مما يؤثر بشدة على التعلم ويستلزم خطة تدخل فورية.',
      analysisEn: 'The classroom environment is highly disruptive, significantly impacting learning and requiring immediate intervention.',
      tipsAr: [
        'اعمل مع القيادة لوضع خطة إنقاذ سريعة لإعادة الانضباط.',
        'نفّذ نظام متابعة يومي للسلوك مع تعزيزات إيجابية فورية.',
        'راجع أساليب إدارة الصف من خلال تدريب متخصص عاجل.',
      ],
      tipsEn: [
        'Work with leadership to design a rapid response plan for restoring order.',
        'Implement a daily behavior tracking system with immediate positive reinforcements.',
        'Attend intensive classroom management training as soon as possible.',
      ],
    },
  },
  communicationInteraction: {
    excellent: {
      titleAr: 'تواصل ملهم',
      titleEn: 'Inspirational Communication',
      analysisAr: 'أسلوب تواصل حي وفعّال يبني جسور الثقة ويعزز مشاركة المتعلمين.',
      analysisEn: 'Dynamic and effective communication builds trust and elevates learner participation.',
      tipsAr: [
        'واصل استخدام لغة الجسد الإيجابية لدعم الرسائل.',
        'ادمج قصصاً أو أمثلة شخصية لزيادة الارتباط.',
        'قدم جلسات إرشادية لزملائك حول أفضل ممارسات التواصل.',
      ],
      tipsEn: [
        'Maintain strong, positive body language to support messaging.',
        'Integrate storytelling or personal anecdotes to boost relatability.',
        'Offer coaching sessions for peers on communication best practices.',
      ],
    },
    good: {
      titleAr: 'تواصل فعّال',
      titleEn: 'Effective Communication',
      analysisAr: 'اللغة واضحة والحضور قوي، ويمكن إضافة المزيد من التفاعل العاطفي أو التشويق.',
      analysisEn: 'Language is clear with strong presence; adding emotional resonance could enhance engagement.',
      tipsAr: [
        'اعمل على تنويع نبرة الصوت لزيادة التأثير.',
        'استخدم إشارات بصرية لدعم التفسير.',
        'امنح مساحة أكبر للطلاب للتعبير عن آرائهم.',
      ],
      tipsEn: [
        'Vary vocal tone to maximize impact.',
        'Use visual cues to reinforce explanations.',
        'Provide more space for students to voice their ideas.',
      ],
    },
    average: {
      titleAr: 'تواصل يحتاج تطويراً',
      titleEn: 'Developing Communication',
      analysisAr: 'التواصل مفهوم في أغلب الأحيان، لكن يحتاج إلى حيوية أكبر لجذب جميع المتعلمين.',
      analysisEn: 'Communication is mostly understandable yet needs more vibrancy to engage all learners.',
      tipsAr: [
        'درّب نفسك على استخدام تعابير وجه واضحة ومعبّرة.',
        'طبّق تمارين التنفس والتحكم لتقوية الصوت.',
        'اطلب من الطلاب تلخيص ما سمعوه للتأكد من وضوح الرسالة.',
      ],
      tipsEn: [
        'Practice using clear, expressive facial expressions.',
        'Use breathing and projection exercises to strengthen your voice.',
        'Have students summarize what they heard to confirm clarity.',
      ],
    },
    poor: {
      titleAr: 'تواصل ضعيف',
      titleEn: 'Weak Communication',
      analysisAr: 'المؤشرات تظهر قصوراً في لغة الجسد أو وضوح الصوت، مما يحد من التفاعل الصفي.',
      analysisEn: 'Indicators show limited body language or voice clarity, restricting classroom engagement.',
      tipsAr: [
        'سجل درسك صوتياً ومرئياً لتحليل لغة الجسد والنبرة.',
        'التحق بدورات متخصصة في مهارات العرض والإلقاء.',
        'استخدم مخططات أو شرائح لتوضيح الرسائل الأساسية.',
      ],
      tipsEn: [
        'Record a lesson to analyze your body language and tone.',
        'Attend specialized courses in presentation and delivery skills.',
        'Use charts or slides to clarify essential messages.',
      ],
    },
    veryPoor: {
      titleAr: 'تواصل حرِج',
      titleEn: 'Critical Communication Gaps',
      analysisAr: 'الحضور الصفي ضعيف جداً والرسائل لا تصل بوضوح، ما يستدعي تدخلاً تدريبياً فورياً.',
      analysisEn: 'Classroom presence is very limited and messages lack clarity, requiring immediate training support.',
      tipsAr: [
        'اطلب جلسات تدريب فردية مع مختص للتواصل.',
        'استخدم نصوصاً مكتوبة ومساعدات بصرية كبرى لتقوية الرسالة.',
        'تمرن يومياً على التواصل أمام المرآة أو الكاميرا.',
      ],
      tipsEn: [
        'Arrange one-on-one coaching with a communications specialist.',
        'Rely on scripted prompts and prominent visuals to reinforce messages.',
        'Practice daily in front of a mirror or camera to build confidence.',
      ],
    },
  },
  planningStructure: {
    excellent: {
      titleAr: 'تخطيط استثنائي للدرس',
      titleEn: 'Exceptional Lesson Planning',
      analysisAr: 'الدرس مبني بعناية مع أهداف واضحة وتسلسل متماسك يعزز التعلم العميق.',
      analysisEn: 'Lessons are carefully crafted with clear objectives and coherent sequencing that promotes deep learning.',
      tipsAr: [
        'استمر في مشاركة خططك كنماذج مرجعية داخل الفريق.',
        'أضف عناصر إثرائية بسيطة لدعم الطلاب المتقدمين.',
        'وثّق استراتيجياتك في دليل تدريب للمعلمين الجدد.',
      ],
      tipsEn: [
        'Continue sharing your plans as exemplars within the team.',
        'Incorporate enrichment elements to extend advanced learners.',
        'Document your strategies in a training guide for new teachers.',
      ],
    },
    good: {
      titleAr: 'تخطيط متين للدرس',
      titleEn: 'Solid Lesson Planning',
      analysisAr: 'التخطيط منظم وفعّال، وإضافة أنشطة انتقالية أكثر سلاسة سيعزز الخبرة الصفية.',
      analysisEn: 'Planning is organized and effective; smoother transitions can further elevate the classroom experience.',
      tipsAr: [
        'تحقق من وضوح الأهداف للطلاب في كل مرحلة.',
        'استخدم أسئلة تقويم سريعة بين مراحل الدرس.',
        'أضف لحظات انعكاسية قصيرة في نهاية كل نشاط.',
      ],
      tipsEn: [
        'Ensure objectives are transparent for students at each stage.',
        'Use quick formative checks between lesson phases.',
        'Include brief reflective pauses after each activity.',
      ],
    },
    average: {
      titleAr: 'تخطيط يحتاج إلى ضبط',
      titleEn: 'Developing Lesson Planning',
      analysisAr: 'هناك إطار عام واضح، لكن بعض المراحل تحتاج تنظيمًا أدق لرفع جودة الدرس.',
      analysisEn: 'The overview is clear, yet some stages need sharper organization to raise lesson quality.',
      tipsAr: [
        'استخدم مخطط تدفق لتتبع تسلسل الأنشطة.',
        'حدد هدفاً مصغراً لكل نشاط لضمان الاتساق.',
        'خطط لأسئلة انتقالية تربط بين مراحل الدرس.',
      ],
      tipsEn: [
        'Use a flowchart to visualize activity sequencing.',
        'Assign a micro-objective to each activity for coherence.',
        'Plan transition questions that link lesson stages.',
      ],
    },
    poor: {
      titleAr: 'تخطيط ضعيف',
      titleEn: 'Weak Planning Structure',
      analysisAr: 'النشاطات تبدو منفصلة والأهداف غير واضحة مما يربك المتعلمين.',
      analysisEn: 'Activities feel disconnected with unclear objectives, creating learner confusion.',
      tipsAr: [
        'اكتب هيكل الدرس (بداية، وسط، نهاية) في بطاقة مختصرة.',
        'حدد الزمن المتوقع لكل مرحلة والتزم به.',
        'اطلب مراجعة الخطة من زميل قبل تنفيذها.',
      ],
      tipsEn: [
        'Outline the lesson structure (beginning, middle, end) on a cue card.',
        'Assign and stick to expected timing for each stage.',
        'Have a colleague review your plan before delivery.',
      ],
    },
    veryPoor: {
      titleAr: 'غياب هيكل الدرس',
      titleEn: 'Critical Planning Issues',
      analysisAr: 'لا يوجد تسلسل واضح للدرس مما يجعل تحقيق الأهداف أمراً صعباً للغاية.',
      analysisEn: 'No clear sequence is evident, making it extremely difficult to achieve lesson objectives.',
      tipsAr: [
        'استخدم قوالب جاهزة لتخطيط الدرس خطوة بخطوة.',
        'اطلب تدريباً مباشراً على تصميم خطط فعالة.',
        'ابدأ بتصميم دروس قصيرة واضحة ثم قم بالتوسّع تدريجياً.',
      ],
      tipsEn: [
        'Adopt ready-made templates to plan lessons step by step.',
        'Request direct coaching on designing effective lesson plans.',
        'Start with short, clear lessons and expand gradually.',
      ],
    },
  },
  teachingTechniques: {
    excellent: {
      titleAr: 'تقنيات تدريس مبتكرة',
      titleEn: 'Innovative Teaching Techniques',
      analysisAr: 'تطبيق رائع للتقنيات الصفية يجعل التعلم تفاعلياً وفعّالاً.',
      analysisEn: 'Outstanding application of classroom techniques yields interactive and effective learning.',
      tipsAr: [
        'استمر في تدريب الطلاب على استخدام تقنيات جديدة.',
        'شارك أفضل استراتيجياتك في اجتماعات التطوير المهني.',
        'قم بتوثيق ممارساتك في دروس نموذجية.',
      ],
      tipsEn: [
        'Continue coaching students to adopt new techniques.',
        'Share your top strategies during professional development sessions.',
        'Document your practices through exemplar lessons.',
      ],
    },
    good: {
      titleAr: 'تقنيات فعّالة',
      titleEn: 'Effective Techniques',
      analysisAr: 'التقنيات المستخدمة مناسبة ويمكن تعزيزها بمزيد من التنوع والتخصيص.',
      analysisEn: 'Techniques are appropriate and can be enriched with more variety and personalization.',
      tipsAr: [
        'أضف أنشطة تفاعلية قصيرة لتعزيز المفاهيم.',
        'استخدم أسئلة CCQ/ICQ بشكل أكثر انتظاماً.',
        'وفّر خيارات مختلفة للطلاب خلال العمل الجماعي.',
      ],
      tipsEn: [
        'Add quick interactive activities to reinforce concepts.',
        'Apply CCQs/ICQs more consistently.',
        'Offer varied choices for students during group work.',
      ],
    },
    average: {
      titleAr: 'تقنيات تحتاج تطويراً',
      titleEn: 'Developing Teaching Techniques',
      analysisAr: 'توجد ممارسات جيدة لكنها تحتاج ضبطاً في التنفيذ والتكرار.',
      analysisEn: 'Good practices exist but implementation and frequency need refinement.',
      tipsAr: [
        'ركز على استخدام الأسئلة التحقيقية بعد كل شرح.',
        'اكتب تعليمات الأنشطة بوضوح وراجعها مع الطلاب.',
        'نفّذ تمارين مراقبة وتدوين ملاحظات أثناء العمل الجماعي.',
      ],
      tipsEn: [
        'Focus on using concept-checking questions after each explanation.',
        'Write activity instructions clearly and review them with students.',
        'Conduct monitoring walk-throughs and take notes during group work.',
      ],
    },
    poor: {
      titleAr: 'تقنيات غير مستقرة',
      titleEn: 'Inconsistent Techniques',
      analysisAr: 'التقنيات المستخدمة غير متوازنة وتؤثر على فهم المتعلمين.',
      analysisEn: 'Techniques are inconsistent, affecting learner understanding.',
      tipsAr: [
        'حضّر قائمة بالخطوات الأساسية لكل نشاط قبل الدرس.',
        'تدرّب على استخدام أسلوب الاستكشاف بدلاً من الإلقاء فقط.',
        'خطط لتغذية راجعة فورية بعد كل نشاط رئيسي.',
      ],
      tipsEn: [
        'Prepare a checklist for the core steps of each activity.',
        'Practice using discovery-based approaches instead of lecture-only.',
        'Plan immediate feedback moments after every key activity.',
      ],
    },
    veryPoor: {
      titleAr: 'فجوة في تقنيات التدريس',
      titleEn: 'Critical Technique Gaps',
      analysisAr: 'لا تُستخدم التقنيات الأساسية مما يقلل من التعلم النشط ويستدعي تدخلاً تدريبياً.',
      analysisEn: 'Core techniques are missing, lowering active learning and requiring focused training.',
      tipsAr: [
        'احضر ورشاً مكثفة حول التقنيات الصفية الحديثة.',
        'اطلب من مشرف تعليم عملي مرافقتك في التخطيط والتنفيذ.',
        'ابدأ بتطبيق تقنية واحدة جديدة يومياً ثم قم بالتوسع.',
      ],
      tipsEn: [
        'Attend intensive workshops on contemporary classroom techniques.',
        'Invite an instructional coach to support planning and delivery.',
        'Introduce one new technique per day and gradually expand.',
      ],
    },
  },
  materialsTechnology: {
    excellent: {
      titleAr: 'مواد وتقنية متميزة',
      titleEn: 'Exceptional Use of Materials & Technology',
      analysisAr: 'الموارد مختارة بعناية وتدعم أهداف الدرس بفعالية عالية.',
      analysisEn: 'Resources are carefully chosen and powerfully reinforce lesson objectives.',
      tipsAr: [
        'شارك مصادر التقنية مع الزملاء لبناء بنك موارد.',
        'استكشف أدوات رقمية جديدة للحفاظ على التميز.',
        'كرر تقييم المواد للتأكد من توافقها مع المتعلمين.',
      ],
      tipsEn: [
        'Share tech resources with colleagues to build a materials bank.',
        'Explore new digital tools to maintain your edge.',
        'Regularly evaluate materials for learner relevance.',
      ],
    },
    good: {
      titleAr: 'استخدام فعّال للمواد',
      titleEn: 'Effective Materials Use',
      analysisAr: 'المواد مناسبة ومتكاملة، ويمكن إضافة عناصر أكثر تفاعلاً.',
      analysisEn: 'Materials are fitting and integrated; more interactive elements would enhance engagement.',
      tipsAr: [
        'أدخل عناصر تقنية تشاركية مثل الاستطلاعات المباشرة.',
        'نوّع بين الموارد الورقية والرقمية.',
        'اعرض نماذج مرئية قبل بدأ الأنشطة الكتابية.',
      ],
      tipsEn: [
        'Include participatory tech such as live polls.',
        'Alternate between print and digital resources.',
        'Display visual exemplars before writing tasks.',
      ],
    },
    average: {
      titleAr: 'مواد بحاجة لتعزيز',
      titleEn: 'Developing Materials & Tech Use',
      analysisAr: 'يتم استخدام الموارد الأساسية لكن تحتاج مزيداً من التخطيط والتنوّع.',
      analysisEn: 'Basic resources are used but require greater planning and variety.',
      tipsAr: [
        'خطط مسبقاً للمواد وحدد كيفية ارتباطها بكل هدف.',
        'استخدم القوالب المرئية لتنظيم المعلومات على السبورة.',
        'أضف وسائط متعددة (صوت، فيديو) لدعم التعلّم.',
      ],
      tipsEn: [
        'Plan materials ahead and link each one to a learning goal.',
        'Use visual templates to organize board work.',
        'Add multimedia (audio, video) to support comprehension.',
      ],
    },
    poor: {
      titleAr: 'نقص في استخدام المواد',
      titleEn: 'Limited Materials & Tech Usage',
      analysisAr: 'قلة الموارد أو تنظيمها يؤثر على وضوح الدرس واستيعاب الطلاب.',
      analysisEn: 'Limited or unstructured resources hinder lesson clarity and student understanding.',
      tipsAr: [
        'جهّز قائمة بالمواد اللازمة لكل درس مسبقاً.',
        'استخدم ألواناً مختلفة على السبورة لتمييز الأفكار.',
        'جرب تطبيقات بسيطة للتفاعل مثل Kahoot أو Quizizz.',
      ],
      tipsEn: [
        'Prepare a checklist of required materials before each lesson.',
        'Use different board colors to differentiate ideas.',
        'Experiment with simple interactive apps like Kahoot or Quizizz.',
      ],
    },
    veryPoor: {
      titleAr: 'غياب المواد الفعّالة',
      titleEn: 'Critical Resource Gaps',
      analysisAr: 'لا يتم توظيف المواد أو التقنية بشكل مناسب مما يضعف عملية التعلم بشكل كبير.',
      analysisEn: 'Materials and technology are not being leveraged, severely weakening learning experiences.',
      tipsAr: [
        'اطلب تدريباً عملياً حول استخدام السبورة والوسائل البصرية.',
        'ابدأ باستعارة موارد جاهزة من الزملاء لحين بناء مجموعتك.',
        'ضع خطة تقنية بسيطة تتضمن وسيلة واحدة لكل درس.',
      ],
      tipsEn: [
        'Seek hands-on coaching on board and visual aid usage.',
        'Borrow ready-made resources from colleagues while building your collection.',
        'Design a basic tech plan incorporating one tool per lesson.',
      ],
    },
  },
  studentEngagement: {
    excellent: {
      titleAr: 'تفاعل طلابي ملهم',
      titleEn: 'Inspiring Student Engagement',
      analysisAr: 'الطلاب متحفزون ونشطون مما يدل على بيئة تعلم راقية وحيوية.',
      analysisEn: 'Students are motivated and active, reflecting a vibrant, high-quality learning environment.',
      tipsAr: [
        'استمر في استخدام الأنشطة المعتمدة على المشروعات.',
        'وثّق استراتيجياتك لتضمينها في مرشد المدارس.',
        'شارك قصص نجاح الطلاب لتعزيز الدافعية.',
      ],
      tipsEn: [
        'Continue project-based strategies to sustain motivation.',
        'Document your engagement techniques for school guides.',
        'Share student success stories to boost morale.',
      ],
    },
    good: {
      titleAr: 'تفاعل فعّال',
      titleEn: 'Effective Engagement',
      analysisAr: 'الطلاب متفاعلون، ويمكن تعميق المشاركة بمزيد من الأنشطة التعاونية.',
      analysisEn: 'Students are engaged; further collaboration can deepen participation.',
      tipsAr: [
        'أدمج تحديات جماعية قصيرة تحفّز العمل الجماعي.',
        'استخدم استراتيجيات للتأكد من مشاركة الطلاب الهادئين.',
        'أضف مهاماً متدرجة تناسب المستويات المختلفة.',
      ],
      tipsEn: [
        'Include short team challenges to spark collaboration.',
        'Apply strategies that draw in quieter students.',
        'Add tiered tasks to address varied ability levels.',
      ],
    },
    average: {
      titleAr: 'تفاعل يحتاج تعزيزاً',
      titleEn: 'Developing Engagement',
      analysisAr: 'يشارك بعض الطلاب بينما يحتاج آخرون لدعم أكبر ليظهروا تفاعلاً.',
      analysisEn: 'Some students participate while others require more support to engage.',
      tipsAr: [
        'طبّق أنشطة أدوار محددة لضمان مشاركة الجميع.',
        'استخدم أسئلة مفتوحة تثير التفكير والنقاش.',
        'قدم محفزات بسيطة للمشاركة مثل النقاط أو الشارات.',
      ],
      tipsEn: [
        'Implement role-based activities to involve every learner.',
        'Use open-ended questions to spark thinking and discussion.',
        'Offer simple incentives like points or badges for participation.',
      ],
    },
    poor: {
      titleAr: 'تفاعل منخفض',
      titleEn: 'Low Engagement',
      analysisAr: 'معدلات المشاركة منخفضة مما يقلل من جودة التعلم وفاعليته.',
      analysisEn: 'Participation rates are low, reducing the quality and effectiveness of learning.',
      tipsAr: [
        'ابدأ بأنشطة كسر الجليد لتعزيز الراحة بين الطلاب.',
        'استخدم أسلوب التعلم القائم على الألعاب لجذب الانتباه.',
        'قدّم خيارات متنوعة للمهام لتلبية الاهتمامات المختلفة.',
      ],
      tipsEn: [
        'Start with icebreakers to build student comfort.',
        'Use game-based learning to capture attention.',
        'Provide varied task options to match different interests.',
      ],
    },
    veryPoor: {
      titleAr: 'انعدام التفاعل تقريباً',
      titleEn: 'Critical Engagement Issues',
      analysisAr: 'التفاعل شبه معدوم ويحتاج تدخل شامل لتغيير مناخ الصف.',
      analysisEn: 'Engagement is nearly absent, requiring comprehensive efforts to shift classroom climate.',
      tipsAr: [
        'أعد تصميم الأنشطة بالكامل لتكون تفاعلية وموجهة للمتعلمين.',
        'أجري استبياناً للطلاب لمعرفة ما يحفزهم.',
        'اطلب الدعم من مختص لتطوير استراتيجيات تحفيز.',
      ],
      tipsEn: [
        'Redesign activities entirely to become learner-driven and interactive.',
        'Survey students to uncover motivators and barriers.',
        'Seek specialist support to craft motivation strategies.',
      ],
    },
  },
  professionalism: {
    excellent: {
      titleAr: 'احترافية نموذجية',
      titleEn: 'Exemplary Professionalism',
      analysisAr: 'المعلم قدوة في الالتزام والسلوك المهني داخل المدرسة وخارجها.',
      analysisEn: 'The teacher exemplifies commitment and professional conduct both in and out of school.',
      tipsAr: [
        'استمر في دعم الزملاء من خلال مشاركة خبراتك.',
        'شارك في مبادرات قيادية لرفع معايير المدرسة.',
        'وثّق إنجازاتك المهنية في ملف تطوير.',
      ],
      tipsEn: [
        'Continue supporting colleagues by sharing expertise.',
        'Engage in leadership initiatives to raise school standards.',
        'Document your professional achievements in a development portfolio.',
      ],
    },
    good: {
      titleAr: 'احترافية قوية',
      titleEn: 'Strong Professionalism',
      analysisAr: 'السلوك المهني مستقر ويمكن تعزيز التعاون والتطوير الذاتي بشكل أكبر.',
      analysisEn: 'Professional conduct is consistent; collaboration and self-development can still grow.',
      tipsAr: [
        'ضع خطة واضحة للتطوير المستمر خلال العام.',
        'شارك في مشاريع مشتركة لتعزيز روح الفريق.',
        'اطلب تغذية راجعة دورية من الإدارة.',
      ],
      tipsEn: [
        'Create a clear plan for continuous development throughout the year.',
        'Join collaborative projects to strengthen teamwork.',
        'Request periodic feedback from leadership.',
      ],
    },
    average: {
      titleAr: 'احترافية تحتاج إلى دعم',
      titleEn: 'Developing Professionalism',
      analysisAr: 'هناك التزام عام لكن بعض الجوانب المهنية تحتاج تعزيزاً كالتواصل أو الالتزام بالسياسات.',
      analysisEn: 'General commitment is present, yet certain aspects like communication or policy adherence need reinforcement.',
      tipsAr: [
        'راجع سياسات المدرسة وحدد النقاط التي تحتاج ضبطاً.',
        'انضم إلى تدريبات رسمية تعزز المهارات المهنية.',
        'ضع تذكيرات للالتزام بالمواعيد والمهام المشتركة.',
      ],
      tipsEn: [
        'Review school policies and pinpoint areas needing alignment.',
        'Join formal trainings that build professional skills.',
        'Set reminders to meet deadlines and collaborative tasks.',
      ],
    },
    poor: {
      titleAr: 'قصور مهني',
      titleEn: 'Professional Gaps',
      analysisAr: 'مظاهر الاحترافية غير متسقة مما قد يؤثر على صورة المؤسسة والثقة بالمعلم.',
      analysisEn: 'Professional behaviours are inconsistent, possibly affecting institutional reputation and trust.',
      tipsAr: [
        'حدد مع مشرفك توقعات واضحة للسلوك المهني.',
        'اطلب مرشداً من الزملاء لمتابعة الأداء المهني.',
        'التزم بسجل يومي لمواعيدك واستجاباتك.',
      ],
      tipsEn: [
        'Clarify professional expectations with your supervisor.',
        'Seek a peer mentor to monitor professional habits.',
        'Keep a daily log of punctuality and follow-through.',
      ],
    },
    veryPoor: {
      titleAr: 'مخاطر مهنية',
      titleEn: 'Critical Professional Concerns',
      analysisAr: 'هناك خلل كبير في الالتزام بالسلوك المهني مما يستدعي خطة تصحيح فورية.',
      analysisEn: 'Significant lapses in professional conduct require an immediate corrective plan.',
      tipsAr: [
        'اعمل مع الإدارة لوضع خطة التزام واضحة بمواعيد متابعة.',
        'شارك في برامج تطوير مهني إلزامية.',
        'اطلب جلسات تغذية راجعة أسبوعية لضبط السلوك.',
      ],
      tipsEn: [
        'Work with leadership to establish a clear compliance plan with follow-ups.',
        'Participate in mandatory professional development programs.',
        'Arrange weekly feedback sessions to adjust behaviours.',
      ],
    },
  },
  assessmentReflection: {
    excellent: {
      titleAr: 'تقييم وتأمل متقدم',
      titleEn: 'Advanced Assessment & Reflection',
      analysisAr: 'يتم استخدام أدوات تقييم متنوعة مع تأمل عميق يوجّه تطوير الدروس.',
      analysisEn: 'A diverse set of assessments is used alongside deep reflection guiding lesson refinement.',
      tipsAr: [
        'شارك أدواتك التقييمية كنماذج داخل الفريق.',
        'وسع استخدام التقييم الذاتي للطلاب في مشاريع أطول.',
        'وثّق تأثير التعديلات في خطة متابعة سنوية.',
      ],
      tipsEn: [
        'Share your assessment tools as exemplars across the team.',
        'Expand student self-assessment into longer-term projects.',
        'Document the impact of adjustments in an annual review plan.',
      ],
    },
    good: {
      titleAr: 'تقييم فعّال',
      titleEn: 'Effective Assessment & Reflection',
      analysisAr: 'تقييمات متعددة تُستخدم بانتظام، ويمكن تعميق التحليل لما بعد الدرس.',
      analysisEn: 'Multiple assessments are used consistently; deeper post-lesson analysis can boost insights.',
      tipsAr: [
        'أضف دفتر تتبع للتقدم الفردي لكل طالب.',
        'ادمج تقييم الأقران ضمن بعض الأنشطة.',
        'خصص وقتاً أسبوعياً للتفكير في النتائج وتعديل الدروس.',
      ],
      tipsEn: [
        'Maintain an individual progress tracker for each student.',
        'Embed peer assessment into selected activities.',
        'Schedule weekly reflection time to adjust lessons.',
      ],
    },
    average: {
      titleAr: 'تقييم بحاجة لتطوير',
      titleEn: 'Developing Assessment Practices',
      analysisAr: 'هناك توجه للتقييم، لكن التنوع والمتابعة يحتاجان إلى تعزيز أكبر.',
      analysisEn: 'Assessment intentions exist, yet diversity and follow-up require strengthening.',
      tipsAr: [
        'استخدم مزيجاً من التقييمات الشفوية والكتابية والتطبيقية.',
        'وثّق ملاحظاتك بعد كل درس ولو بشكل مختصر.',
        'صمم بطاقة سريعة لتحديد نقاط القوة والضعف لكل مجموعة.',
      ],
      tipsEn: [
        'Mix oral, written, and practical assessments.',
        'Document short post-lesson notes after each session.',
        'Design a quick card to note strengths/needs per group.',
      ],
    },
    poor: {
      titleAr: 'تقييم محدود',
      titleEn: 'Limited Assessment & Reflection',
      analysisAr: 'التقييم يعتمد على أدوات قليلة ولا يوجد استخدام واضح للنتائج لتحسين التدريس.',
      analysisEn: 'Assessment relies on few tools with little evidence of using results to improve teaching.',
      tipsAr: [
        'أعد تصميم نظام تقييمك ليشمل أكثر من أداة واحدة.',
        'اجمع بيانات عن تقدم الطلاب بشكل منتظم وحللها.',
        'ضع خطة متابعة بعد كل اختبار لمعالجة الفجوات.',
      ],
      tipsEn: [
        'Redesign your assessment system to include multiple tools.',
        'Collect and analyze progress data regularly.',
        'Create a post-assessment action plan to address gaps.',
      ],
    },
    veryPoor: {
      titleAr: 'فجوات كبيرة في التقييم',
      titleEn: 'Critical Assessment Gaps',
      analysisAr: 'لا توجد آلية تقييم واضحة ولا يتم التفكير في نتائج التعلم بعد الدرس.',
      analysisEn: 'No clear assessment mechanism exists and post-lesson reflection is missing.',
      tipsAr: [
        'احصل على تدريب مكثف في تصميم أدوات التقييم.',
        'ابدأ بتوثيق نتائج الطلاب باستخدام نموذج بسيط.',
        'اعمل مع مشرف لوضع خطة تقييم وتأمل أسبوعية.',
      ],
      tipsEn: [
        'Attend intensive training on assessment design.',
        'Start documenting student outcomes with a simple template.',
        'Work with a mentor to build a weekly assessment-reflection plan.',
      ],
    },
  },
}

export const getAdvice = (categoryId, score) => {
  const level = levelFromScore(score)
  return adviceData[categoryId]?.[level] || null
}

export { levelFromScore }
