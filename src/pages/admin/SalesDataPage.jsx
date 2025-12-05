// //Aishwarya Empire Tasks
// "use client"

// import { useState, useEffect, useCallback, useMemo,useRef  } from "react"
// import { CheckCircle2, Upload, X, Search, History, ArrowLeft,Camera } from "lucide-react"
// import AdminLayout from "../../components/layout/AdminLayout"

// // Configuration object - Move all configurations here
// const CONFIG = {
//   // Google Apps Script URL
//   APPS_SCRIPT_URL:
//     "https://script.google.com/macros/s/AKfycbxDEgWct4VVx7Oh81zMxwl1UsvretjqrCy9X7XlOoIqy9LXmGAAIlx-6Wvx3dZha0Xr/exec",

//   // Google Drive folder ID for file uploads
//   DRIVE_FOLDER_ID: "1eAqzUds6SFYIJYlYtxB8gVx3QLS8OZaI",

//   // Sheet name to work with
//   SHEET_NAME: "Checklist",

//   // Page configuration
//   PAGE_CONFIG: {
//     title: "Checklist Tasks",
//     historyTitle: "Checklist Task History",
//     description: "Showing today, tomorrow's tasks and past due tasks",
//     historyDescription: "Read-only view of completed tasks with submission history",
//   },
// }

// function AccountDataPage() {
//   const [accountData, setAccountData] = useState([])
//   const [selectedItems, setSelectedItems] = useState(new Set())
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [successMessage, setSuccessMessage] = useState("")
//   const [additionalData, setAdditionalData] = useState({})
//   const [searchTerm, setSearchTerm] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [remarksData, setRemarksData] = useState({})
//   const [historyData, setHistoryData] = useState([])
//   const [showHistory, setShowHistory] = useState(false)
//   const [membersList, setMembersList] = useState([])
//   const [selectedMembers, setSelectedMembers] = useState([])
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [userRole, setUserRole] = useState("")
//   const [username, setUsername] = useState("")

//   // State for Given By and Name filters
//   const [givenByList, setGivenByList] = useState([])
//   const [nameList, setNameList] = useState([])
//   const [selectedGivenBy, setSelectedGivenBy] = useState([])
//   const [selectedNames, setSelectedNames] = useState([])
//   // Add this state at the top with other useState declarations
// const [currentCaptureId, setCurrentCaptureId] = useState(null);
// // Ye states already hai aapke code me (around line 50-60), check karo ye sab exist karte hai:
// const [isCameraOpen, setIsCameraOpen] = useState(false);
// const [cameraStream, setCameraStream] = useState(null);
// const [cameraError, setCameraError] = useState("");
// const videoRef = useRef(null);
// const canvasRef = useRef(null);
// const [isCameraLoading, setIsCameraLoading] = useState(false); // ✅ Ye line check karo
// // Add these functions in your component (around line 150-250, after other functions)



// // Camera cleanup when component unmounts
// useEffect(() => {
//   return () => {
//     if (cameraStream) {
//       cameraStream.getTracks().forEach(track => track.stop());
//     }
//   };
// }, [cameraStream]);
// const startCamera = async () => {
//   try {
//     setCameraError("");
//     setIsCameraLoading(true);

//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       setCameraError("Camera not supported on this device");
//       setIsCameraLoading(false);
//       return;
//     }

//     console.log("Requesting camera access...");

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: 'environment',
//         width: { ideal: 1280 },
//         height: { ideal: 720 }
//       },
//       audio: false
//     });

//     console.log("Camera access granted!");

//     setCameraStream(stream);
//     setIsCameraOpen(true);

//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;

//       await new Promise((resolve, reject) => {
//         const video = videoRef.current;
//         if (!video) {
//           reject(new Error("Video ref lost"));
//           return;
//         }

//         let metadataLoaded = false;
//         let canPlay = false;

//         const checkReady = () => {
//           if (metadataLoaded && canPlay) {
//             console.log("✅ Video fully ready! Dimensions:", video.videoWidth, "x", video.videoHeight);
//             resolve();
//           }
//         };

//         video.onloadedmetadata = () => {
//           console.log("📹 Metadata loaded");
//           metadataLoaded = true;
//           checkReady();
//         };

//         video.oncanplay = () => {
//           console.log("▶️ Can play event fired");
//           canPlay = true;
//           checkReady();
//         };

//         video.onerror = (err) => {
//           console.error("Video error:", err);
//           reject(err);
//         };

//         setTimeout(() => {
//           if (!metadataLoaded || !canPlay) {
//             reject(new Error("Video initialization timeout"));
//           }
//         }, 10000);
//       });

//       await videoRef.current.play();
//       console.log("🎬 Camera streaming successfully!");
//     }

//   } catch (error) {
//     console.error("Camera error:", error);

//     if (error.name === 'NotAllowedError') {
//       setCameraError("Camera access denied. Please allow camera permissions.");
//     } else if (error.name === 'NotFoundError') {
//       setCameraError("No camera found on this device.");
//     } else if (error.name === 'NotReadableError') {
//       setCameraError("Camera is being used by another application.");
//     } else {
//       setCameraError("Unable to access camera: " + error.message);
//     }
//   } finally {
//     setIsCameraLoading(false);
//   }
// };

// const stopCamera = () => {
//   console.log("🛑 Stopping camera...");

//   if (cameraStream) {
//     cameraStream.getTracks().forEach(track => {
//       track.stop();
//       console.log("Track stopped:", track.kind);
//     });
//     setCameraStream(null);
//   }

//   if (videoRef.current) {
//     videoRef.current.srcObject = null;
//   }

//   setIsCameraOpen(false);
//   setCameraError("");
//   setIsCameraLoading(false);
//   setCurrentCaptureId(null);

//   console.log("✅ Camera stopped successfully");
// };

// const capturePhoto = async () => {
//   if (!videoRef.current || !currentCaptureId) {
//     alert("Camera not initialized. Please try again.");
//     return;
//   }

//   const video = videoRef.current;

//   try {
//     console.log("🔍 Video readyState:", video.readyState);
//     console.log("🔍 Video dimensions:", video.videoWidth, "x", video.videoHeight);

//     if (video.readyState < 2) {
//       alert("Camera is still loading. Please wait a moment and try again.");
//       return;
//     }

//     if (!video.videoWidth || !video.videoHeight) {
//       alert("Camera dimensions not available. Please restart camera.");
//       return;
//     }

//     if (!cameraStream || !cameraStream.active) {
//       alert("Camera stream not active. Please restart camera.");
//       return;
//     }

//     console.log("📸 Starting photo capture...");

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const context = canvas.getContext('2d');
//     if (!context) {
//       alert("Failed to create canvas context");
//       return;
//     }

//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const blob = await new Promise((resolve, reject) => {
//       canvas.toBlob(
//         (blob) => {
//           if (blob) {
//             resolve(blob);
//           } else {
//             reject(new Error("Failed to create blob"));
//           }
//         },
//         'image/jpeg',
//         0.92
//       );
//     });

//     console.log("✅ Photo captured! Size:", (blob.size / 1024).toFixed(2), "KB");

//     const file = new File(
//       [blob],
//       `camera-${Date.now()}.jpg`,
//       { type: 'image/jpeg' }
//     );

//     stopCamera();

//     handleImageUpload(currentCaptureId, { target: { files: [file] } });

//     alert("✅ Photo captured successfully!");

//   } catch (error) {
//     console.error("❌ Capture error:", error);
//     alert("Failed to capture photo: " + error.message);
//   }
// };

//   const formatDateToDDMMYYYY = (date) => {
//     const day = date.getDate().toString().padStart(2, "0")
//     const month = (date.getMonth() + 1).toString().padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}/${month}/${year}`
//   }

//   const isEmpty = (value) => {
//     return value === null || value === undefined || (typeof value === "string" && value.trim() === "")
//   }

//   useEffect(() => {
//     const role = sessionStorage.getItem("role")
//     const user = sessionStorage.getItem("username")
//     setUserRole(role || "")
//     setUsername(user || "")
//   }, [])

//   const parseGoogleSheetsDate = (dateStr) => {
//     if (!dateStr) return ""

//     if (typeof dateStr === "string" && dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
//       return dateStr
//     }

//     if (typeof dateStr === "string" && dateStr.startsWith("Date(")) {
//       const match = /Date$$(\d+),(\d+),(\d+)$$/.exec(dateStr)
//       if (match) {
//         const year = Number.parseInt(match[1], 10)
//         const month = Number.parseInt(match[2], 10)
//         const day = Number.parseInt(match[3], 10)
//         return `${day.toString().padStart(2, "0")}/${(month + 1).toString().padStart(2, "0")}/${year}`
//       }
//     }

//     try {
//       const date = new Date(dateStr)
//       if (!isNaN(date.getTime())) {
//         return formatDateToDDMMYYYY(date)
//       }
//     } catch (error) {
//       console.error("Error parsing date:", error)
//     }

//     return dateStr
//   }

//   const parseDateFromDDMMYYYY = (dateStr) => {
//     if (!dateStr || typeof dateStr !== "string") return null
//     const parts = dateStr.split("/")
//     if (parts.length !== 3) return null
//     return new Date(parts[2], parts[1] - 1, parts[0])
//   }

//   const sortDateWise = (a, b) => {
//     const dateStrA = a["col6"] || ""
//     const dateStrB = b["col6"] || ""
//     const dateA = parseDateFromDDMMYYYY(dateStrA)
//     const dateB = parseDateFromDDMMYYYY(dateStrB)
//     if (!dateA) return 1
//     if (!dateB) return -1
//     return dateA.getTime() - dateB.getTime()
//   }

//   const resetFilters = () => {
//     setSearchTerm("")
//     setSelectedMembers([])
//     setSelectedGivenBy([])
//     setSelectedNames([])
//     setStartDate("")
//     setEndDate("")
//   }

//   // Extract unique values for filters from data
//   const extractUniqueValues = useCallback((data) => {
//     const givenBySet = new Set()
//     const nameSet = new Set()

//     data.forEach((item) => {
//       const givenBy = item["col3"]
//       const name = item["col4"]

//       if (givenBy && givenBy.trim() !== "") {
//         givenBySet.add(givenBy)
//       }
//       if (name && name.trim() !== "") {
//         nameSet.add(name)
//       }
//     })

//     return {
//       givenByList: Array.from(givenBySet).sort(),
//       nameList: Array.from(nameSet).sort()
//     }
//   }, [])

//   // Enhanced filtered data with filters
//   const filteredAccountData = useMemo(() => {
//     let filtered = accountData

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter((account) =>
//         Object.values(account).some(
//           (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
//         ),
//       )
//     }

//     // Given By filter
//     if (selectedGivenBy.length > 0) {
//       filtered = filtered.filter((account) => selectedGivenBy.includes(account["col3"]))
//     }

//     // Name filter
//     if (selectedNames.length > 0) {
//       filtered = filtered.filter((account) => selectedNames.includes(account["col4"]))
//     }

//     return filtered.sort(sortDateWise)
//   }, [accountData, searchTerm, selectedGivenBy, selectedNames])

//   // Enhanced filtered history data with filters
//   const filteredHistoryData = useMemo(() => {
//     return historyData
//       .filter((item) => {
//         const matchesSearch = searchTerm
//           ? Object.values(item).some(
//             (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
//           )
//           : true

//         const matchesMember = selectedMembers.length > 0 ? selectedMembers.includes(item["col4"]) : true

//         const matchesGivenBy = selectedGivenBy.length > 0 ? selectedGivenBy.includes(item["col3"]) : true

//         const matchesName = selectedNames.length > 0 ? selectedNames.includes(item["col4"]) : true

//         let matchesDateRange = true
//         if (startDate || endDate) {
//           const itemDate = parseDateFromDDMMYYYY(item["col10"])
//           if (!itemDate) return false

//           if (startDate) {
//             const startDateObj = new Date(startDate)
//             startDateObj.setHours(0, 0, 0, 0)
//             if (itemDate < startDateObj) matchesDateRange = false
//           }

//           if (endDate) {
//             const endDateObj = new Date(endDate)
//             endDateObj.setHours(23, 59, 59, 999)
//             if (itemDate > endDateObj) matchesDateRange = false
//           }
//         }

//         return matchesSearch && matchesMember && matchesGivenBy && matchesName && matchesDateRange
//       })
//       .sort((a, b) => {
//         const dateStrA = a["col10"] || ""
//         const dateStrB = b["col10"] || ""
//         const dateA = parseDateFromDDMMYYYY(dateStrA)
//         const dateB = parseDateFromDDMMYYYY(dateStrB)
//         if (!dateA) return 1
//         if (!dateB) return -1
//         return dateB.getTime() - dateA.getTime()
//       })
//   }, [historyData, searchTerm, selectedMembers, selectedGivenBy, selectedNames, startDate, endDate])

//   const getTaskStatistics = () => {
//     const totalCompleted = historyData.length
//     const memberStats =
//       selectedMembers.length > 0
//         ? selectedMembers.reduce((stats, member) => {
//           const memberTasks = historyData.filter((task) => task["col4"] === member).length
//           return {
//             ...stats,
//             [member]: memberTasks,
//           }
//         }, {})
//         : {}
//     const filteredTotal = filteredHistoryData.length

//     return {
//       totalCompleted,
//       memberStats,
//       filteredTotal,
//     }
//   }

//   const handleMemberSelection = (member) => {
//     setSelectedMembers((prev) => {
//       if (prev.includes(member)) {
//         return prev.filter((item) => item !== member)
//       } else {
//         return [...prev, member]
//       }
//     })
//   }

//   // Handler for Given By filter
//   const handleGivenBySelection = (givenBy) => {
//     setSelectedGivenBy((prev) => {
//       if (prev.includes(givenBy)) {
//         return prev.filter((item) => item !== givenBy)
//       } else {
//         return [...prev, givenBy]
//       }
//     })
//   }

//   // Handler for Name filter
//   const handleNameSelection = (name) => {
//     setSelectedNames((prev) => {
//       if (prev.includes(name)) {
//         return prev.filter((item) => item !== name)
//       } else {
//         return [...prev, name]
//       }
//     })
//   }

//   const getFilteredMembersList = () => {
//     if (userRole === "admin") {
//       return membersList
//     } else {
//       return membersList.filter((member) => member.toLowerCase() === username.toLowerCase())
//     }
//   }

//   // Get filtered Given By list based on user role
//   const getFilteredGivenByList = () => {
//     if (userRole === "admin") {
//       return givenByList
//     } else {
//       // For non-admin users, show all "Given By" options to see who assigned tasks
//       return givenByList
//     }
//   }

//   // Get filtered Name list based on user role
//   const getFilteredNameList = () => {
//     if (userRole === "admin") {
//       return nameList
//     } else {
//       return nameList.filter((name) => name.toLowerCase() === username.toLowerCase())
//     }
//   }

//   const fetchSheetData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const pendingAccounts = []
//       const historyRows = []

//       const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?sheet=${CONFIG.SHEET_NAME}&action=fetch`)

//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`)
//       }

//       const text = await response.text()
//       let data

//       try {
//         data = JSON.parse(text)
//       } catch (parseError) {
//         const jsonStart = text.indexOf("{")
//         const jsonEnd = text.lastIndexOf("}")
//         if (jsonStart !== -1 && jsonEnd !== -1) {
//           const jsonString = text.substring(jsonStart, jsonEnd + 1)
//           data = JSON.parse(jsonString)
//         } else {
//           throw new Error("Invalid JSON response from server")
//         }
//       }

//       const currentUsername = sessionStorage.getItem("username")
//       const currentUserRole = sessionStorage.getItem("role")

//       const today = new Date()
//       const tomorrow = new Date(today)
//       tomorrow.setDate(today.getDate() + 1)

//       const todayStr = formatDateToDDMMYYYY(today)
//       const tomorrowStr = formatDateToDDMMYYYY(tomorrow)

//       console.log("Filtering dates:", { todayStr, tomorrowStr })

//       const membersSet = new Set()

//       let rows = []
//       if (data.table && data.table.rows) {
//         rows = data.table.rows
//       } else if (Array.isArray(data)) {
//         rows = data
//       } else if (data.values) {
//         rows = data.values.map((row) => ({ c: row.map((val) => ({ v: val })) }))
//       }

//       rows.forEach((row, rowIndex) => {
//         if (rowIndex === 0) return

//         let rowValues = []
//         if (row.c) {
//           rowValues = row.c.map((cell) => (cell && cell.v !== undefined ? cell.v : ""))
//         } else if (Array.isArray(row)) {
//           rowValues = row
//         } else {
//           console.log("Unknown row format:", row)
//           return
//         }

//         const assignedTo = rowValues[4] || "Unassigned"
//         membersSet.add(assignedTo)

//         const isUserMatch = currentUserRole === "admin" || assignedTo.toLowerCase() === currentUsername.toLowerCase()
//         if (!isUserMatch && currentUserRole !== "admin") return

//         const columnGValue = rowValues[6]
//         const columnKValue = rowValues[10]
//         const columnMValue = rowValues[12]

//         if (columnMValue && columnMValue.toString().trim() === "DONE") {
//           return
//         }

//         const rowDateStr = columnGValue ? String(columnGValue).trim() : ""
//         const formattedRowDate = parseGoogleSheetsDate(rowDateStr)

//         const googleSheetsRowIndex = rowIndex + 1

//         // Create stable unique ID using task ID and row index
//         const taskId = rowValues[1] || ""
//         const stableId = taskId
//           ? `task_${taskId}_${googleSheetsRowIndex}`
//           : `row_${googleSheetsRowIndex}_${Math.random().toString(36).substring(2, 15)}`

//         const rowData = {
//           _id: stableId,
//           _rowIndex: googleSheetsRowIndex,
//           _taskId: taskId,
//         }

//         const columnHeaders = [
//           { id: "col0", label: "Timestamp", type: "string" },
//           { id: "col1", label: "Task ID", type: "string" },
//           { id: "col2", label: "Firm", type: "string" },
//           { id: "col3", label: "Given By", type: "string" },
//           { id: "col4", label: "Name", type: "string" },
//           { id: "col5", label: "Task Description", type: "string" },
//           { id: "col6", label: "Task Start Date", type: "date" },
//           { id: "col7", label: "Freq", type: "string" },
//           { id: "col8", label: "Enable Reminders", type: "string" },
//           { id: "col9", label: "Require Attachment", type: "string" },
//           { id: "col10", label: "Actual", type: "date" },
//           { id: "col11", label: "Column L", type: "string" },
//           { id: "col12", label: "Status", type: "string" },
//           { id: "col13", label: "Remarks", type: "string" },
//           { id: "col14", label: "Uploaded Image", type: "string" },
//           { id: "col15", label: "Attached File", type: "string" }, // ADD THIS LINE

//         ]

//         columnHeaders.forEach((header, index) => {
//           const cellValue = rowValues[index]
//           if (header.type === "date" || (cellValue && String(cellValue).startsWith("Date("))) {
//             rowData[header.id] = cellValue ? parseGoogleSheetsDate(String(cellValue)) : ""
//           } else if (header.type === "number" && cellValue !== null && cellValue !== "") {
//             rowData[header.id] = cellValue
//           } else {
//             rowData[header.id] = cellValue !== null ? cellValue : ""
//           }
//         })

//         console.log(`Row ${rowIndex}: Task ID = ${rowData.col1}, Google Sheets Row = ${googleSheetsRowIndex}`)

//         const hasColumnG = !isEmpty(columnGValue)
//         const isColumnKEmpty = isEmpty(columnKValue)

//         if (hasColumnG && isColumnKEmpty) {
//           const rowDate = parseDateFromDDMMYYYY(formattedRowDate)
//           const isToday = formattedRowDate === todayStr
//           const isTomorrow = formattedRowDate === tomorrowStr
//           const isPastDate = rowDate && rowDate <= today

//           if (isToday || isTomorrow || isPastDate) {
//             pendingAccounts.push(rowData)
//           }
//         } else if (hasColumnG && !isColumnKEmpty) {
//           const isUserHistoryMatch =
//             currentUserRole === "admin" || assignedTo.toLowerCase() === currentUsername.toLowerCase()
//           if (isUserHistoryMatch) {
//             historyRows.push(rowData)
//           }
//         }
//       })

//       setMembersList(Array.from(membersSet).sort())

//       // Extract unique values for filters
//       const { givenByList, nameList } = extractUniqueValues([...pendingAccounts, ...historyRows])
//       setGivenByList(givenByList)
//       setNameList(nameList)

//       setAccountData(pendingAccounts)
//       setHistoryData(historyRows)
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching sheet data:", error)
//       setError("Failed to load account data: " + error.message)
//       setLoading(false)
//     }
//   }, [extractUniqueValues])

//   useEffect(() => {
//     fetchSheetData()
//   }, [fetchSheetData])

//   // Checkbox handlers with better state management
//   const handleSelectItem = useCallback((id, isChecked) => {
//     console.log(`Checkbox action: ${id} -> ${isChecked}`)

//     setSelectedItems((prev) => {
//       const newSelected = new Set(prev)

//       if (isChecked) {
//         newSelected.add(id)
//       } else {
//         newSelected.delete(id)
//         // Clean up related data when unchecking
//         setAdditionalData((prevData) => {
//           const newAdditionalData = { ...prevData }
//           delete newAdditionalData[id]
//           return newAdditionalData
//         })
//         setRemarksData((prevRemarks) => {
//           const newRemarksData = { ...prevRemarks }
//           delete newRemarksData[id]
//           return newRemarksData
//         })
//       }

//       console.log(`Updated selection: ${Array.from(newSelected)}`)
//       return newSelected
//     })
//   }, [])

//   const handleCheckboxClick = useCallback(
//     (e, id) => {
//       e.stopPropagation()
//       const isChecked = e.target.checked
//       console.log(`Checkbox clicked: ${id}, checked: ${isChecked}`)
//       handleSelectItem(id, isChecked)
//     },
//     [handleSelectItem],
//   )

//   const handleSelectAllItems = useCallback(
//     (e) => {
//       e.stopPropagation()
//       const checked = e.target.checked
//       console.log(`Select all clicked: ${checked}`)

//       if (checked) {
//         const allIds = filteredAccountData.map((item) => item._id)
//         setSelectedItems(new Set(allIds))
//         console.log(`Selected all items: ${allIds}`)
//       } else {
//         setSelectedItems(new Set())
//         setAdditionalData({})
//         setRemarksData({})
//         console.log("Cleared all selections")
//       }
//     },
//     [filteredAccountData],
//   )

//   const handleImageUpload = async (id, e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     console.log(`Image upload for: ${id}`)
//     setAccountData((prev) => prev.map((item) => (item._id === id ? { ...item, image: file } : item)))
//   }

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = () => resolve(reader.result)
//       reader.onerror = (error) => reject(error)
//     })
//   }

//   const toggleHistory = () => {
//     setShowHistory((prev) => !prev)
//     resetFilters()
//   }

//   // MAIN SUBMIT FUNCTION - CACHE MEMORY APPROACH
//   const handleSubmit = async () => {
//     const selectedItemsArray = Array.from(selectedItems)

//     if (selectedItemsArray.length === 0) {
//       alert("Please select at least one item to submit")
//       return
//     }

//     const missingRemarks = selectedItemsArray.filter((id) => {
//       const additionalStatus = additionalData[id]
//       const remarks = remarksData[id]
//       return additionalStatus === "No" && (!remarks || remarks.trim() === "")
//     })

//     if (missingRemarks.length > 0) {
//       alert(`Please provide remarks for items marked as "No". ${missingRemarks.length} item(s) are missing remarks.`)
//       return
//     }

//     const missingRequiredImages = selectedItemsArray.filter((id) => {
//       const item = accountData.find((account) => account._id === id)
//       const requiresAttachment = item["col9"] && item["col9"].toUpperCase() === "YES"
//       return requiresAttachment && !item.image
//     })

//     if (missingRequiredImages.length > 0) {
//       alert(
//         `Please upload images for all required attachments. ${missingRequiredImages.length} item(s) are missing required images.`,
//       )
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const today = new Date()
//       const todayFormatted = formatDateToDDMMYYYY(today)

//       // Prepare submitted items for history BEFORE removing from pending
//       const submittedItemsForHistory = selectedItemsArray.map((id) => {
//         const item = accountData.find((account) => account._id === id)
//         return {
//           ...item,
//           col10: todayFormatted, // Actual completion date
//           col12: additionalData[id] || "", // Status (Yes/No)
//           col13: remarksData[id] || "", // Remarks
//           col14: item.image ? (typeof item.image === "string" ? item.image : "") : "", // Image URL (will be updated after upload)
//         }
//       })

//       // CACHE MEMORY UPDATE 1: Remove submitted items from pending table immediately
//       setAccountData((prev) => prev.filter((item) => !selectedItems.has(item._id)))

//       // CACHE MEMORY UPDATE 2: Add submitted items to history immediately
//       setHistoryData((prev) => [...submittedItemsForHistory, ...prev])

//       // Clear selections and form data immediately
//       setSelectedItems(new Set())
//       setAdditionalData({})
//       setRemarksData({})

//       // Show success message immediately
//       setSuccessMessage(`Successfully processed ${selectedItemsArray.length} task records! Tasks moved to history.`)

//       // Auto-clear success message after 5 seconds
//       setTimeout(() => {
//         setSuccessMessage("")
//       }, 5000)

//       // Now handle the background submission to Google Sheets
//       const submissionData = await Promise.all(
//         selectedItemsArray.map(async (id) => {
//           const item = accountData.find((account) => account._id === id)

//           console.log(`Preparing submission for item:`, {
//             id: id,
//             taskId: item["col1"],
//             rowIndex: item._rowIndex,
//             expectedTaskId: item._taskId,
//           })

//           let imageUrl = ""

//           if (item.image instanceof File) {
//             try {
//               const base64Data = await fileToBase64(item.image)

//               const uploadFormData = new FormData()
//               uploadFormData.append("action", "uploadFile")
//               uploadFormData.append("base64Data", base64Data)
//               uploadFormData.append(
//                 "fileName",
//                 `task_${item["col1"]}_${Date.now()}.${item.image.name.split(".").pop()}`,
//               )
//               uploadFormData.append("mimeType", item.image.type)
//               uploadFormData.append("folderId", CONFIG.DRIVE_FOLDER_ID)

//               const uploadResponse = await fetch(CONFIG.APPS_SCRIPT_URL, {
//                 method: "POST",
//                 body: uploadFormData,
//               })

//               const uploadResult = await uploadResponse.json()
//               if (uploadResult.success) {
//                 imageUrl = uploadResult.fileUrl

//                 // Update the history data with the actual image URL
//                 setHistoryData((prev) =>
//                   prev.map((historyItem) =>
//                     historyItem._id === id ? { ...historyItem, col14: imageUrl } : historyItem,
//                   ),
//                 )
//               }
//             } catch (uploadError) {
//               console.error("Error uploading image:", uploadError)
//             }
//           }

//           return {
//             taskId: item["col1"],
//             rowIndex: item._rowIndex,
//             actualDate: todayFormatted,
//             status: additionalData[id] || "",
//             remarks: remarksData[id] || "",
//             imageUrl: imageUrl,
//           }
//         }),
//       )

//       console.log("Final submission data:", submissionData)

//       // Submit to Google Sheets in background
//       const formData = new FormData()
//       formData.append("sheetName", CONFIG.SHEET_NAME)
//       formData.append("action", "updateTaskData")
//       formData.append("rowData", JSON.stringify(submissionData))

//       const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
//         method: "POST",
//         body: formData,
//       })

//       const result = await response.json()

//       if (!result.success) {
//         // If submission failed, we could optionally rollback the cache changes
//         console.error("Background submission failed:", result.error)
//         // For now, we'll just log the error but keep the UI updated
//         // You could implement rollback logic here if needed
//       }
//     } catch (error) {
//       console.error("Submission error:", error)
//       // Since we already updated the UI optimistically, we could rollback here
//       // For now, we'll just show an error but keep the UI changes
//       alert("Warning: There was an error with background submission, but your changes are saved locally.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Convert Set to Array for display
//   const selectedItemsCount = selectedItems.size

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//   <h1 className="text-2xl font-bold tracking-tight text-purple-700">
//     {showHistory ? CONFIG.PAGE_CONFIG.historyTitle : CONFIG.PAGE_CONFIG.title}
//   </h1>

//   <div className="flex flex-col sm:flex-row sm:space-x-4 gap-3 w-full sm:w-auto">
//     <div className="relative w-full sm:w-auto">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//       <input
//         type="text"
//         placeholder={showHistory ? "Search history..." : "Search tasks..."}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="pl-10 pr-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
//       />
//     </div>

//     <button
//       onClick={toggleHistory}
//       className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 px-4 text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
//     >
//       {showHistory ? (
//         <div className="flex items-center justify-center">
//           <ArrowLeft className="h-4 w-4 mr-1" />
//           <span>Back to Tasks</span>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center">
//           <History className="h-4 w-4 mr-1" />
//           <span>View History</span>
//         </div>
//       )}
//     </button>

//     {!showHistory && (
//       <button
//         onClick={handleSubmit}
//         disabled={selectedItemsCount === 0 || isSubmitting}
//         className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
//       >
//         {isSubmitting ? "Processing..." : `Submit Selected (${selectedItemsCount})`}
//       </button>
//     )}
//   </div>
// </div>


//         {successMessage && (
//           <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center justify-between">
//             <div className="flex items-center">
//               <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
//               {successMessage}
//             </div>
//             <button onClick={() => setSuccessMessage("")} className="text-green-500 hover:text-green-700">
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         )}

//         <div className="rounded-lg border border-purple-200 shadow-md bg-white overflow-hidden">
//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-4">
//             <h2 className="text-purple-700 font-medium">
//               {showHistory ? `Completed ${CONFIG.SHEET_NAME} Tasks` : `Pending ${CONFIG.SHEET_NAME} Tasks`}
//             </h2>
//             <p className="text-purple-600 text-sm">
//               {showHistory
//                 ? `${CONFIG.PAGE_CONFIG.historyDescription} for ${userRole === "admin" ? "all" : "your"} tasks`
//                 : CONFIG.PAGE_CONFIG.description}
//             </p>
//           </div>

//           {loading ? (
//             <div className="text-center py-10">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
//               <p className="text-purple-600">Loading task data...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
//               {error}{" "}
//               <button className="underline ml-2" onClick={() => window.location.reload()}>
//                 Try again
//               </button>
//             </div>
//           ) : showHistory ? (
//             <>
//               {/* Enhanced History Filters */}
//               <div className="p-4 border-b border-purple-100 bg-gray-50">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                   {/* Given By Filter */}
//                   {getFilteredGivenByList().length > 0 && (
//                     <div className="flex flex-col">
//                       <label htmlFor="history-givenby-filter" className="mb-2 text-sm font-medium text-purple-700">
//                         Filter by Given By:
//                       </label>
//                       <select
//                         id="history-givenby-filter"
//                         value={selectedGivenBy[0] || ""}
//                         onChange={(e) => {
//                           if (e.target.value === "") {
//                             setSelectedGivenBy([])
//                           } else {
//                             setSelectedGivenBy([e.target.value])
//                           }
//                         }}
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                       >
//                         <option value="">All Given By</option>
//                         {getFilteredGivenByList().map((givenBy, idx) => (
//                           <option key={idx} value={givenBy}>
//                             {givenBy}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {/* Name Filter */}
//                   {getFilteredNameList().length > 0 && (
//                     <div className="flex flex-col">
//                       <label htmlFor="history-name-filter" className="mb-2 text-sm font-medium text-purple-700">
//                         Filter by Name:
//                       </label>
//                       <select
//                         id="history-name-filter"
//                         value={selectedNames[0] || ""}
//                         onChange={(e) => {
//                           if (e.target.value === "") {
//                             setSelectedNames([])
//                           } else {
//                             setSelectedNames([e.target.value])
//                           }
//                         }}
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                       >
//                         <option value="">All Names</option>
//                         {getFilteredNameList().map((name, idx) => (
//                           <option key={idx} value={name}>
//                             {name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {/* Member Filter */}
//                   {getFilteredMembersList().length > 0 && (
//                     <div className="flex flex-col">
//                       <label htmlFor="history-member-filter" className="mb-2 text-sm font-medium text-purple-700">
//                         Filter by Member:
//                       </label>
//                       <select
//                         id="history-member-filter"
//                         value={selectedMembers[0] || ""}
//                         onChange={(e) => {
//                           if (e.target.value === "") {
//                             setSelectedMembers([])
//                           } else {
//                             setSelectedMembers([e.target.value])
//                           }
//                         }}
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                       >
//                         <option value="">All Members</option>
//                         {getFilteredMembersList().map((member, idx) => (
//                           <option key={idx} value={member}>
//                             {member}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {/* Clear Filters Button */}
//                   {(selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate || searchTerm) && (
//                     <div className="flex flex-col justify-end">
//                       <button
//                         onClick={resetFilters}
//                         className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium transition-colors"
//                       >
//                         Clear All Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Date Range Filter */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
//                   <div className="flex flex-col">
//                     <label htmlFor="start-date" className="mb-2 text-sm font-medium text-purple-700">
//                       From Date:
//                     </label>
//                     <input
//                       id="start-date"
//                       type="date"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label htmlFor="end-date" className="mb-2 text-sm font-medium text-purple-700">
//                       To Date:
//                     </label>
//                     <input
//                       id="end-date"
//                       type="date"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Task Statistics */}
//               <div className="p-4 border-b border-purple-100 bg-blue-50">
//                 <div className="flex flex-col">
//                   <h3 className="text-sm font-medium text-blue-700 mb-2">Task Completion Statistics:</h3>
//                   <div className="flex flex-wrap gap-4">
//                     <div className="px-3 py-2 bg-white rounded-md shadow-sm">
//                       <span className="text-xs text-gray-500">Total Completed</span>
//                       <div className="text-lg font-semibold text-blue-600">{getTaskStatistics().totalCompleted}</div>
//                     </div>

//                     {(selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate || searchTerm) && (
//                       <div className="px-3 py-2 bg-white rounded-md shadow-sm">
//                         <span className="text-xs text-gray-500">Filtered Results</span>
//                         <div className="text-lg font-semibold text-blue-600">{getTaskStatistics().filteredTotal}</div>
//                       </div>
//                     )}

//                     {selectedMembers.map((member) => (
//                       <div key={member} className="px-3 py-2 bg-white rounded-md shadow-sm">
//                         <span className="text-xs text-gray-500">{member}</span>
//                         <div className="text-lg font-semibold text-indigo-600">
//                           {getTaskStatistics().memberStats[member]}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//  {/* History Table */}
// <div className="overflow-x-auto">
//   {/* Table for sm and above */}
//   <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Given By</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Description</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATTACHED FILE</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Task Start Date</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freq</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable Reminders</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Require Attachment</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">Actual Date</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">Status</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">Remarks</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachment</th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {filteredHistoryData.length > 0 ? (
//         filteredHistoryData.map((history) => (
//           <tr key={history._id} className="hover:bg-gray-50">
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm font-medium text-gray-900">{history["col1"] || "—"}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col2"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col3"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col4"] || "—"}</div></td>
//             <td className="px-6 py-4"><div className="text-sm text-gray-900 max-w-xs" title={history["col5"]}>{history["col5"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {history["col15"] ? (
//                 <a href={history["col15"]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                   View File
//                 </a>
//               ) : (
//                 <span className="text-sm text-gray-400">—</span>
//               )}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap bg-yellow-50"><div className="text-sm text-gray-900">{history["col6"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col7"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col8"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col9"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap bg-green-50"><div className="text-sm font-medium text-gray-900">{history["col10"] || "—"}</div></td>
//             <td className="px-6 py-4 whitespace-nowrap bg-blue-50">
//               <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                 history["col12"] === "Yes" ? "bg-green-100 text-green-800" :
//                 history["col12"] === "No" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
//               }`}>{history["col12"] || "—"}</span>
//             </td>
//             <td className="px-6 py-4 bg-purple-50">
//               <div className="text-sm text-gray-900 max-w-xs" title={history["col13"]}>{history["col13"] || "—"}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {history["col14"] ? (
//                 <a href={history["col14"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center">
//                   <img src={history["col14"] || "/placeholder.svg?height=32&width=32"} alt="Attachment" className="h-8 w-8 object-cover rounded-md mr-2" />
//                   View
//                 </a>
//               ) : (
//                 <span className="text-gray-400">No attachment</span>
//               )}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={13} className="px-6 py-4 text-center text-gray-500">
//             {searchTerm || selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate
//               ? "No historical records matching your filters"
//               : "No completed records found"}
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>

//   {/* Cards for mobile screens */}
//   <div className="sm:hidden space-y-4">
//     {filteredHistoryData.length > 0 ? (
//       filteredHistoryData.map((history) => (
//         <div key={history._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
//           <div className="text-sm font-semibold text-gray-700 mb-1">Task ID: {history["col1"] || "—"}</div>
//           <div className="text-sm text-gray-900 mb-1">Project: {history["col2"] || "—"}</div>
//           <div className="text-sm text-gray-900 mb-1">Given By: {history["col3"] || "—"}</div>
//           <div className="text-sm text-gray-900 mb-1">Name: {history["col4"] || "—"}</div>
//           <div className="text-sm text-gray-900 mb-1" title={history["col5"]}>Task Description: {history["col5"] || "—"}</div>
//           <div className="text-sm mb-1">
//             Attached File: {history["col15"] ? (
//               <a href={history["col15"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
//                 View File
//               </a>
//             ) : (
//               <span className="text-gray-400">—</span>
//             )}
//           </div>
//           <div className="text-sm mb-1 bg-yellow-50 p-1 rounded">Task Start Date: {history["col6"] || "—"}</div>
//           <div className="text-sm mb-1">Freq: {history["col7"] || "—"}</div>
//           <div className="text-sm mb-1">Enable Reminders: {history["col8"] || "—"}</div>
//           <div className="text-sm mb-1">Require Attachment: {history["col9"] || "—"}</div>
//           <div className="text-sm mb-1 bg-green-50 p-1 rounded">Actual Date: {history["col10"] || "—"}</div>
//           <div className="text-sm mb-1 bg-blue-50 p-1 rounded">
//             Status: <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//               history["col12"] === "Yes" ? "bg-green-100 text-green-800" :
//               history["col12"] === "No" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
//             }`}>{history["col12"] || "—"}</span>
//           </div>
//           <div className="text-sm mb-1 bg-purple-50 p-1 rounded" title={history["col13"]}>Remarks: {history["col13"] || "—"}</div>
//           <div className="text-sm">
//             Attachment: {history["col14"] ? (
//               <a href={history["col14"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center">
//                 <img src={history["col14"] || "/placeholder.svg?height=32&width=32"} alt="Attachment" className="h-8 w-8 object-cover rounded-md mr-2" />
//                 View
//               </a>
//             ) : (
//               <span className="text-gray-400">No attachment</span>
//             )}
//           </div>
//         </div>
//       ))
//     ) : (
//       <div className="text-center text-gray-500 py-6">
//         {searchTerm || selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate
//           ? "No historical records matching your filters"
//           : "No completed records found"}
//       </div>
//     )}
//   </div>
// </div>


//             </>
//           ) : (
//             <>
//               {/* Enhanced Pending Tasks Filters */}
//               <div className="p-4 border-b border-purple-100 bg-gray-50">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                   {/* Given By Filter for Pending Tasks */}
//                   {getFilteredGivenByList().length > 0 && (
//                     <div className="flex flex-col">
//                       <label htmlFor="pending-givenby-filter" className="mb-2 text-sm font-medium text-purple-700">
//                         Filter by Given By:
//                       </label>
//                       <select
//                         id="pending-givenby-filter"
//                         value={selectedGivenBy[0] || ""}
//                         onChange={(e) => {
//                           if (e.target.value === "") {
//                             setSelectedGivenBy([])
//                           } else {
//                             setSelectedGivenBy([e.target.value])
//                           }
//                         }}
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                       >
//                         <option value="">All Given By</option>
//                         {getFilteredGivenByList().map((givenBy, idx) => (
//                           <option key={idx} value={givenBy}>
//                             {givenBy}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {/* Name Filter for Pending Tasks */}
//                   {getFilteredNameList().length > 0 && (
//                     <div className="flex flex-col">
//                       <label htmlFor="pending-name-filter" className="mb-2 text-sm font-medium text-purple-700">
//                         Filter by Name:
//                       </label>
//                       <select
//                         id="pending-name-filter"
//                         value={selectedNames[0] || ""}
//                         onChange={(e) => {
//                           if (e.target.value === "") {
//                             setSelectedNames([])
//                           } else {
//                             setSelectedNames([e.target.value])
//                           }
//                         }}
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                       >
//                         <option value="">All Names</option>
//                         {getFilteredNameList().map((name, idx) => (
//                           <option key={idx} value={name}>
//                             {name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {/* Clear Filters Button for Pending Tasks */}
//                   {(selectedGivenBy.length > 0 || selectedNames.length > 0 || searchTerm) && (
//                     <div className="flex flex-col justify-end">
//                       <button
//                         onClick={resetFilters}
//                         className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium transition-colors"
//                       >
//                         Clear All Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

             

// <div className="overflow-x-auto">
//   <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
//     {/* Updated thead - REMOVED Project & Given By columns */}
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           <input 
//             type="checkbox" 
//             className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//             checked={filteredAccountData.length > 0 && selectedItems.size === filteredAccountData.length}
//             onChange={handleSelectAllItems}
//           />
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Task Start Date</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Status</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-orange-50">Remarks</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Image</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Description</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATTACHED FILE</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freq</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable Reminders</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Require Attachment</th>
//       </tr>
//     </thead>
    
//     {/* Updated tbody - REMOVED Project & Given By columns, REORDERED as requested */}
//     <tbody className="bg-white divide-y divide-gray-200">
//       {filteredAccountData.length === 0 ? (
//         <tr>
//           <td colSpan="12" className="px-6 py-4 text-center text-gray-500">
//             {searchTerm || selectedGivenBy.length > 0 || selectedNames.length > 0 
//               ? 'No pending tasks matching your filters' 
//               : 'No pending tasks found'
//             }
//           </td>
//         </tr>
//       ) : (
//         filteredAccountData.map((account) => {
//           const isSelected = selectedItems.has(account.id)
//           return (
//             <tr 
//               key={account.id} 
//               className={isSelected ? 'bg-purple-50 hover:bg-gray-50' : 'hover:bg-gray-50'}
//             >
//               {/* Checkbox */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <input 
//                   type="checkbox" 
//                   className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                   checked={isSelected}
//                   onChange={(e) => handleCheckboxClick(e, account.id)}
//                 />
//               </td>
              
//               {/* Task ID */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">{account.col1}</div>
//               </td>
//               {/* Task Start Date */}
//               <td className="px-6 py-4 whitespace-nowrap bg-yellow-50">
//                 <div className="text-sm text-gray-900">{account.col6}</div>
//               </td>
              
//               {/* Status */}
//               <td className="px-6 py-4 whitespace-nowrap bg-yellow-50">
//                 <select 
//                   disabled={!isSelected}
//                   value={additionalData[account.id] || ''}
//                   onChange={(e) => {
//                     setAdditionalData(prev => ({ ...prev, [account.id]: e.target.value }))
//                     if (e.target.value !== 'No') {
//                       setRemarksData(prev => {
//                         const newData = { ...prev }
//                         delete newData[account.id]
//                         return newData
//                       })
//                     }
//                   }}
//                   className="border border-gray-300 rounded-md px-2 py-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 >
//                   <option value="">Select...</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </td>
              
//               {/* Remarks */}
//               <td className="px-6 py-4 whitespace-nowrap bg-orange-50">
//                 <input 
//                   type="text" 
//                   placeholder="Enter remarks" 
//                   disabled={!isSelected || !additionalData[account.id]}
//                   value={remarksData[account.id] || ''}
//                   onChange={(e) => setRemarksData(prev => ({ ...prev, [account.id]: e.target.value }))}
//                   className="border rounded-md px-2 py-1 w-full border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//               </td>
//               {/* Upload Image */}
//               <td className="px-3 py-4 bg-green-50 min-w-[120px]">
//                 {account.image ? (
//                   <div className="flex items-center">
//                     <img 
//                       src={typeof account.image === 'string' ? account.image : URL.createObjectURL(account.image)} 
//                       alt="Receipt" 
//                       className="h-10 w-10 object-cover rounded-md mr-2 flex-shrink-0"
//                     />
//                     <div className="flex flex-col min-w-0">
//                       <span className="text-xs text-gray-500 break-words">
//                         {account.image instanceof File ? account.image.name : 'Uploaded'}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center cursor-pointer" onClick={() => {
//                     const input = document.createElement('input')
//                     input.type = 'file'
//                     input.accept = 'image/*'
//                     input.onchange = (e) => handleImageUpload(account.id, e)
//                     input.click()
//                   }}>
//                     <Upload className="h-5 w-5 text-gray-400 mr-2 hover:text-purple-500" />
//                     <span className="text-sm text-gray-400 hover:text-purple-500">Upload Image</span>
//                   </div>
//                 )}
//               </td>
//               {/* Name (col4) */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{account.col4}</div>
//               </td>
              
//               <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
//   <div className="whitespace-normal break-words">
//     {account.col5}
//   </div>
// </td>
              
//               {/* ATTACHED FILE */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {account.col15 ? (
//                   <a 
//                     href={account.col15} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
//                   >
//                     <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     View File
//                   </a>
//                 ) : (
//                   <span className="text-sm text-gray-400">—</span>
//                 )}
//               </td>
              
              
//               {/* Freq */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{account.col7}</div>
//               </td>
              
//               {/* Enable Reminders */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{account.col8}</div>
//               </td>
              
//               {/* Require Attachment */}
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{account.col9}</div>
//               </td>
              
              
//             </tr>
//           )
//         })
//       )}
//     </tbody>
//   </table>
// </div>


//             </>
//           )}
//         </div>
//         {/* Camera Modal - Add this before the last closing </div> */}
// {isCameraOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
//     <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
//       <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
//         <h3 className="text-lg font-semibold">📸 Take Photo</h3>
//         <button
//           onClick={stopCamera}
//           className="text-white hover:text-gray-200 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="relative bg-black">
//         <video
//           ref={videoRef}
//           className="w-full h-[400px] object-cover"
//           autoPlay
//           playsInline
//           muted
//         />

//         {isCameraLoading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="text-white text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-3"></div>
//               <p>Initializing camera...</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {cameraError && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4">
//           <p className="text-sm text-red-700">{cameraError}</p>
//         </div>
//       )}

//       <div className="p-4 bg-gray-50 flex gap-3 justify-end">
//         <button
//           type="button"
//           onClick={stopCamera}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={capturePhoto}
//           disabled={isCameraLoading}
//           className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//         >
//           📸 Capture Photo
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       </div>
//     </AdminLayout>
//   )
// }

// export default AccountDataPage





//Aishwarya Empire Tasks
"use client"

import { useState, useEffect, useCallback, useMemo,useRef  } from "react"
import { CheckCircle2, Upload, X, Search, History, ArrowLeft,Camera } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"

// Configuration object - Move all configurations here
const CONFIG = {
  // Google Apps Script URL
  APPS_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbxDEgWct4VVx7Oh81zMxwl1UsvretjqrCy9X7XlOoIqy9LXmGAAIlx-6Wvx3dZha0Xr/exec",

  // Google Drive folder ID for file uploads
  DRIVE_FOLDER_ID: "1eAqzUds6SFYIJYlYtxB8gVx3QLS8OZaI",

  // Sheet name to work with
  SHEET_NAME: "Checklist",

  // Page configuration
  PAGE_CONFIG: {
    title: "Checklist Tasks",
    historyTitle: "Checklist Task History",
    description: "Showing today and past due tasks (excluding future dates)",
    historyDescription: "Read-only view of completed tasks with submission history",
  },
}

function AccountDataPage() {
  const [accountData, setAccountData] = useState([])
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [additionalData, setAdditionalData] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [remarksData, setRemarksData] = useState({})
  const [historyData, setHistoryData] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [membersList, setMembersList] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [userRole, setUserRole] = useState("")
  const [username, setUsername] = useState("")

  // State for Given By and Name filters
  const [givenByList, setGivenByList] = useState([])
  const [nameList, setNameList] = useState([])
  const [selectedGivenBy, setSelectedGivenBy] = useState([])
  const [selectedNames, setSelectedNames] = useState([])
  // Add this state at the top with other useState declarations
const [currentCaptureId, setCurrentCaptureId] = useState(null);
// Ye states already hai aapke code me (around line 50-60), check karo ye sab exist karte hai:
const [isCameraOpen, setIsCameraOpen] = useState(false);
const [cameraStream, setCameraStream] = useState(null);
const [cameraError, setCameraError] = useState("");
const videoRef = useRef(null);
const canvasRef = useRef(null);
const [isCameraLoading, setIsCameraLoading] = useState(false); // ✅ Ye line check karo
// Add these functions in your component (around line 150-250, after other functions)



// Camera cleanup when component unmounts
useEffect(() => {
  return () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
  };
}, [cameraStream]);
const startCamera = async () => {
  try {
    setCameraError("");
    setIsCameraLoading(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera not supported on this device");
      setIsCameraLoading(false);
      return;
    }

    console.log("Requesting camera access...");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    console.log("Camera access granted!");

    setCameraStream(stream);
    setIsCameraOpen(true);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;

      await new Promise((resolve, reject) => {
        const video = videoRef.current;
        if (!video) {
          reject(new Error("Video ref lost"));
          return;
        }

        let metadataLoaded = false;
        let canPlay = false;

        const checkReady = () => {
          if (metadataLoaded && canPlay) {
            console.log("✅ Video fully ready! Dimensions:", video.videoWidth, "x", video.videoHeight);
            resolve();
          }
        };

        video.onloadedmetadata = () => {
          console.log("📹 Metadata loaded");
          metadataLoaded = true;
          checkReady();
        };

        video.oncanplay = () => {
          console.log("▶️ Can play event fired");
          canPlay = true;
          checkReady();
        };

        video.onerror = (err) => {
          console.error("Video error:", err);
          reject(err);
        };

        setTimeout(() => {
          if (!metadataLoaded || !canPlay) {
            reject(new Error("Video initialization timeout"));
          }
        }, 10000);
      });

      await videoRef.current.play();
      console.log("🎬 Camera streaming successfully!");
    }

  } catch (error) {
    console.error("Camera error:", error);

    if (error.name === 'NotAllowedError') {
      setCameraError("Camera access denied. Please allow camera permissions.");
    } else if (error.name === 'NotFoundError') {
      setCameraError("No camera found on this device.");
    } else if (error.name === 'NotReadableError') {
      setCameraError("Camera is being used by another application.");
    } else {
      setCameraError("Unable to access camera: " + error.message);
    }
  } finally {
    setIsCameraLoading(false);
  }
};

const stopCamera = () => {
  console.log("🛑 Stopping camera...");

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => {
      track.stop();
      console.log("Track stopped:", track.kind);
    });
    setCameraStream(null);
  }

  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }

  setIsCameraOpen(false);
  setCameraError("");
  setIsCameraLoading(false);
  setCurrentCaptureId(null);

  console.log("✅ Camera stopped successfully");
};

const capturePhoto = async () => {
  if (!videoRef.current || !currentCaptureId) {
    alert("Camera not initialized. Please try again.");
    return;
  }

  const video = videoRef.current;

  try {
    console.log("🔍 Video readyState:", video.readyState);
    console.log("🔍 Video dimensions:", video.videoWidth, "x", video.videoHeight);

    if (video.readyState < 2) {
      alert("Camera is still loading. Please wait a moment and try again.");
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      alert("Camera dimensions not available. Please restart camera.");
      return;
    }

    if (!cameraStream || !cameraStream.active) {
      alert("Camera stream not active. Please restart camera.");
      return;
    }

    console.log("📸 Starting photo capture...");

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      alert("Failed to create canvas context");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        'image/jpeg',
        0.92
      );
    });

    console.log("✅ Photo captured! Size:", (blob.size / 1024).toFixed(2), "KB");

    const file = new File(
      [blob],
      `camera-${Date.now()}.jpg`,
      { type: 'image/jpeg' }
    );

    stopCamera();

    handleImageUpload(currentCaptureId, { target: { files: [file] } });

    alert("✅ Photo captured successfully!");

  } catch (error) {
    console.error("❌ Capture error:", error);
    alert("Failed to capture photo: " + error.message);
  }
};

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const isEmpty = (value) => {
    return value === null || value === undefined || (typeof value === "string" && value.trim() === "")
  }

  useEffect(() => {
    const role = sessionStorage.getItem("role")
    const user = sessionStorage.getItem("username")
    setUserRole(role || "")
    setUsername(user || "")
  }, [])

  const parseGoogleSheetsDate = (dateStr) => {
    if (!dateStr) return ""

    if (typeof dateStr === "string" && dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return dateStr
    }

    if (typeof dateStr === "string" && dateStr.startsWith("Date(")) {
      const match = /Date$$(\d+),(\d+),(\d+)$$/.exec(dateStr)
      if (match) {
        const year = Number.parseInt(match[1], 10)
        const month = Number.parseInt(match[2], 10)
        const day = Number.parseInt(match[3], 10)
        return `${day.toString().padStart(2, "0")}/${(month + 1).toString().padStart(2, "0")}/${year}`
      }
    }

    try {
      const date = new Date(dateStr)
      if (!isNaN(date.getTime())) {
        return formatDateToDDMMYYYY(date)
      }
    } catch (error) {
      console.error("Error parsing date:", error)
    }

    return dateStr
  }

  const parseDateFromDDMMYYYY = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return null
    const parts = dateStr.split("/")
    if (parts.length !== 3) return null
    return new Date(parts[2], parts[1] - 1, parts[0])
  }

  const sortDateWise = (a, b) => {
    const dateStrA = a["col6"] || ""
    const dateStrB = b["col6"] || ""
    const dateA = parseDateFromDDMMYYYY(dateStrA)
    const dateB = parseDateFromDDMMYYYY(dateStrB)
    if (!dateA) return 1
    if (!dateB) return -1
    return dateA.getTime() - dateB.getTime()
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedMembers([])
    setSelectedGivenBy([])
    setSelectedNames([])
    setStartDate("")
    setEndDate("")
  }

  // Extract unique values for filters from data
  const extractUniqueValues = useCallback((data) => {
    const givenBySet = new Set()
    const nameSet = new Set()

    data.forEach((item) => {
      const givenBy = item["col3"]
      const name = item["col4"]

      if (givenBy && givenBy.trim() !== "") {
        givenBySet.add(givenBy)
      }
      if (name && name.trim() !== "") {
        nameSet.add(name)
      }
    })

    return {
      givenByList: Array.from(givenBySet).sort(),
      nameList: Array.from(nameSet).sort()
    }
  }, [])

  // Enhanced filtered data with filters
  const filteredAccountData = useMemo(() => {
    let filtered = accountData

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((account) =>
        Object.values(account).some(
          (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    }

    // Given By filter
    if (selectedGivenBy.length > 0) {
      filtered = filtered.filter((account) => selectedGivenBy.includes(account["col3"]))
    }

    // Name filter
    if (selectedNames.length > 0) {
      filtered = filtered.filter((account) => selectedNames.includes(account["col4"]))
    }

    return filtered.sort(sortDateWise)
  }, [accountData, searchTerm, selectedGivenBy, selectedNames])

  // Enhanced filtered history data with filters
  const filteredHistoryData = useMemo(() => {
    return historyData
      .filter((item) => {
        const matchesSearch = searchTerm
          ? Object.values(item).some(
            (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
          )
          : true

        const matchesMember = selectedMembers.length > 0 ? selectedMembers.includes(item["col4"]) : true

        const matchesGivenBy = selectedGivenBy.length > 0 ? selectedGivenBy.includes(item["col3"]) : true

        const matchesName = selectedNames.length > 0 ? selectedNames.includes(item["col4"]) : true

        let matchesDateRange = true
        if (startDate || endDate) {
          const itemDate = parseDateFromDDMMYYYY(item["col10"])
          if (!itemDate) return false

          if (startDate) {
            const startDateObj = new Date(startDate)
            startDateObj.setHours(0, 0, 0, 0)
            if (itemDate < startDateObj) matchesDateRange = false
          }

          if (endDate) {
            const endDateObj = new Date(endDate)
            endDateObj.setHours(23, 59, 59, 999)
            if (itemDate > endDateObj) matchesDateRange = false
          }
        }

        return matchesSearch && matchesMember && matchesGivenBy && matchesName && matchesDateRange
      })
      .sort((a, b) => {
        const dateStrA = a["col10"] || ""
        const dateStrB = b["col10"] || ""
        const dateA = parseDateFromDDMMYYYY(dateStrA)
        const dateB = parseDateFromDDMMYYYY(dateStrB)
        if (!dateA) return 1
        if (!dateB) return -1
        return dateB.getTime() - dateA.getTime()
      })
  }, [historyData, searchTerm, selectedMembers, selectedGivenBy, selectedNames, startDate, endDate])

  const getTaskStatistics = () => {
    const totalCompleted = historyData.length
    const memberStats =
      selectedMembers.length > 0
        ? selectedMembers.reduce((stats, member) => {
          const memberTasks = historyData.filter((task) => task["col4"] === member).length
          return {
            ...stats,
            [member]: memberTasks,
          }
        }, {})
        : {}
    const filteredTotal = filteredHistoryData.length

    return {
      totalCompleted,
      memberStats,
      filteredTotal,
    }
  }

  const handleMemberSelection = (member) => {
    setSelectedMembers((prev) => {
      if (prev.includes(member)) {
        return prev.filter((item) => item !== member)
      } else {
        return [...prev, member]
      }
    })
  }

  // Handler for Given By filter
  const handleGivenBySelection = (givenBy) => {
    setSelectedGivenBy((prev) => {
      if (prev.includes(givenBy)) {
        return prev.filter((item) => item !== givenBy)
      } else {
        return [...prev, givenBy]
      }
    })
  }

  // Handler for Name filter
  const handleNameSelection = (name) => {
    setSelectedNames((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name)
      } else {
        return [...prev, name]
      }
    })
  }

  const getFilteredMembersList = () => {
    if (userRole === "admin") {
      return membersList
    } else {
      return membersList.filter((member) => member.toLowerCase() === username.toLowerCase())
    }
  }

  // Get filtered Given By list based on user role
  const getFilteredGivenByList = () => {
    if (userRole === "admin") {
      return givenByList
    } else {
      // For non-admin users, show all "Given By" options to see who assigned tasks
      return givenByList
    }
  }

  // Get filtered Name list based on user role
  const getFilteredNameList = () => {
    if (userRole === "admin") {
      return nameList
    } else {
      return nameList.filter((name) => name.toLowerCase() === username.toLowerCase())
    }
  }

  const fetchSheetData = useCallback(async () => {
    try {
      setLoading(true)
      const pendingAccounts = []
      const historyRows = []

      const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?sheet=${CONFIG.SHEET_NAME}&action=fetch`)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`)
      }

      const text = await response.text()
      let data

      try {
        data = JSON.parse(text)
      } catch (parseError) {
        const jsonStart = text.indexOf("{")
        const jsonEnd = text.lastIndexOf("}")
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonString = text.substring(jsonStart, jsonEnd + 1)
          data = JSON.parse(jsonString)
        } else {
          throw new Error("Invalid JSON response from server")
        }
      }

      const currentUsername = sessionStorage.getItem("username")
      const currentUserRole = sessionStorage.getItem("role")

      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set to beginning of day for comparison
      
      // REMOVED tomorrow calculation since we don't want to show future dates
      // const tomorrow = new Date(today)
      // tomorrow.setDate(today.getDate() + 1)

      const todayStr = formatDateToDDMMYYYY(today)
      // REMOVED tomorrowStr since we don't need it
      // const tomorrowStr = formatDateToDDMMYYYY(tomorrow)

      console.log("Filtering dates - showing tasks with start date <= today:", { todayStr })

      const membersSet = new Set()

      let rows = []
      if (data.table && data.table.rows) {
        rows = data.table.rows
      } else if (Array.isArray(data)) {
        rows = data
      } else if (data.values) {
        rows = data.values.map((row) => ({ c: row.map((val) => ({ v: val })) }))
      }

      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return

        let rowValues = []
        if (row.c) {
          rowValues = row.c.map((cell) => (cell && cell.v !== undefined ? cell.v : ""))
        } else if (Array.isArray(row)) {
          rowValues = row
        } else {
          console.log("Unknown row format:", row)
          return
        }

        const assignedTo = rowValues[4] || "Unassigned"
        membersSet.add(assignedTo)

        const isUserMatch = currentUserRole === "admin" || assignedTo.toLowerCase() === currentUsername.toLowerCase()
        if (!isUserMatch && currentUserRole !== "admin") return

        const columnGValue = rowValues[6]
        const columnKValue = rowValues[10]
        const columnMValue = rowValues[12]

        if (columnMValue && columnMValue.toString().trim() === "DONE") {
          return
        }

        const rowDateStr = columnGValue ? String(columnGValue).trim() : ""
        const formattedRowDate = parseGoogleSheetsDate(rowDateStr)

        const googleSheetsRowIndex = rowIndex + 1

        // Create stable unique ID using task ID and row index
        const taskId = rowValues[1] || ""
        const stableId = taskId
          ? `task_${taskId}_${googleSheetsRowIndex}`
          : `row_${googleSheetsRowIndex}_${Math.random().toString(36).substring(2, 15)}`

        const rowData = {
          _id: stableId,
          _rowIndex: googleSheetsRowIndex,
          _taskId: taskId,
        }

        const columnHeaders = [
          { id: "col0", label: "Timestamp", type: "string" },
          { id: "col1", label: "Task ID", type: "string" },
          { id: "col2", label: "Firm", type: "string" },
          { id: "col3", label: "Given By", type: "string" },
          { id: "col4", label: "Name", type: "string" },
          { id: "col5", label: "Task Description", type: "string" },
          { id: "col6", label: "Task Start Date", type: "date" },
          { id: "col7", label: "Freq", type: "string" },
          { id: "col8", label: "Enable Reminders", type: "string" },
          { id: "col9", label: "Require Attachment", type: "string" },
          { id: "col10", label: "Actual", type: "date" },
          { id: "col11", label: "Column L", type: "string" },
          { id: "col12", label: "Status", type: "string" },
          { id: "col13", label: "Remarks", type: "string" },
          { id: "col14", label: "Uploaded Image", type: "string" },
          { id: "col15", label: "Attached File", type: "string" }, // ADD THIS LINE

        ]

        columnHeaders.forEach((header, index) => {
          const cellValue = rowValues[index]
          if (header.type === "date" || (cellValue && String(cellValue).startsWith("Date("))) {
            rowData[header.id] = cellValue ? parseGoogleSheetsDate(String(cellValue)) : ""
          } else if (header.type === "number" && cellValue !== null && cellValue !== "") {
            rowData[header.id] = cellValue
          } else {
            rowData[header.id] = cellValue !== null ? cellValue : ""
          }
        })

        console.log(`Row ${rowIndex}: Task ID = ${rowData.col1}, Google Sheets Row = ${googleSheetsRowIndex}`)

        const hasColumnG = !isEmpty(columnGValue)
        const isColumnKEmpty = isEmpty(columnKValue)

        if (hasColumnG && isColumnKEmpty) {
          const rowDate = parseDateFromDDMMYYYY(formattedRowDate)
          
          // ONLY SHOW TASKS WITH START DATE <= TODAY (not tomorrow or future)
          if (rowDate && rowDate <= today) {
            pendingAccounts.push(rowData)
            console.log(`Added task with start date: ${formattedRowDate} (<= today: ${todayStr})`)
          } else if (rowDate) {
            console.log(`Skipped future task with start date: ${formattedRowDate} (> today: ${todayStr})`)
          }
        } else if (hasColumnG && !isColumnKEmpty) {
          const isUserHistoryMatch =
            currentUserRole === "admin" || assignedTo.toLowerCase() === currentUsername.toLowerCase()
          if (isUserHistoryMatch) {
            historyRows.push(rowData)
          }
        }
      })

      setMembersList(Array.from(membersSet).sort())

      // Extract unique values for filters
      const { givenByList, nameList } = extractUniqueValues([...pendingAccounts, ...historyRows])
      setGivenByList(givenByList)
      setNameList(nameList)

      setAccountData(pendingAccounts)
      setHistoryData(historyRows)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching sheet data:", error)
      setError("Failed to load account data: " + error.message)
      setLoading(false)
    }
  }, [extractUniqueValues])

  useEffect(() => {
    fetchSheetData()
  }, [fetchSheetData])

  // Checkbox handlers with better state management
  const handleSelectItem = useCallback((id, isChecked) => {
    console.log(`Checkbox action: ${id} -> ${isChecked}`)

    setSelectedItems((prev) => {
      const newSelected = new Set(prev)

      if (isChecked) {
        newSelected.add(id)
      } else {
        newSelected.delete(id)
        // Clean up related data when unchecking
        setAdditionalData((prevData) => {
          const newAdditionalData = { ...prevData }
          delete newAdditionalData[id]
          return newAdditionalData
        })
        setRemarksData((prevRemarks) => {
          const newRemarksData = { ...prevRemarks }
          delete newRemarksData[id]
          return newRemarksData
        })
      }

      console.log(`Updated selection: ${Array.from(newSelected)}`)
      return newSelected
    })
  }, [])

  const handleCheckboxClick = useCallback(
    (e, id) => {
      e.stopPropagation()
      const isChecked = e.target.checked
      console.log(`Checkbox clicked: ${id}, checked: ${isChecked}`)
      handleSelectItem(id, isChecked)
    },
    [handleSelectItem],
  )

  const handleSelectAllItems = useCallback(
    (e) => {
      e.stopPropagation()
      const checked = e.target.checked
      console.log(`Select all clicked: ${checked}`)

      if (checked) {
        const allIds = filteredAccountData.map((item) => item._id)
        setSelectedItems(new Set(allIds))
        console.log(`Selected all items: ${allIds}`)
      } else {
        setSelectedItems(new Set())
        setAdditionalData({})
        setRemarksData({})
        console.log("Cleared all selections")
      }
    },
    [filteredAccountData],
  )

  const handleImageUpload = async (id, e) => {
    const file = e.target.files[0]
    if (!file) return

    console.log(`Image upload for: ${id}`)
    setAccountData((prev) => prev.map((item) => (item._id === id ? { ...item, image: file } : item)))
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const toggleHistory = () => {
    setShowHistory((prev) => !prev)
    resetFilters()
  }

  // MAIN SUBMIT FUNCTION - CACHE MEMORY APPROACH
  const handleSubmit = async () => {
    const selectedItemsArray = Array.from(selectedItems)

    if (selectedItemsArray.length === 0) {
      alert("Please select at least one item to submit")
      return
    }

    const missingRemarks = selectedItemsArray.filter((id) => {
      const additionalStatus = additionalData[id]
      const remarks = remarksData[id]
      return additionalStatus === "No" && (!remarks || remarks.trim() === "")
    })

    if (missingRemarks.length > 0) {
      alert(`Please provide remarks for items marked as "No". ${missingRemarks.length} item(s) are missing remarks.`)
      return
    }

    const missingRequiredImages = selectedItemsArray.filter((id) => {
      const item = accountData.find((account) => account._id === id)
      const requiresAttachment = item["col9"] && item["col9"].toUpperCase() === "YES"
      return requiresAttachment && !item.image
    })

    if (missingRequiredImages.length > 0) {
      alert(
        `Please upload images for all required attachments. ${missingRequiredImages.length} item(s) are missing required images.`,
      )
      return
    }

    setIsSubmitting(true)

    try {
      const today = new Date()
      const todayFormatted = formatDateToDDMMYYYY(today)

      // Prepare submitted items for history BEFORE removing from pending
      const submittedItemsForHistory = selectedItemsArray.map((id) => {
        const item = accountData.find((account) => account._id === id)
        return {
          ...item,
          col10: todayFormatted, // Actual completion date
          col12: additionalData[id] || "", // Status (Yes/No)
          col13: remarksData[id] || "", // Remarks
          col14: item.image ? (typeof item.image === "string" ? item.image : "") : "", // Image URL (will be updated after upload)
        }
      })

      // CACHE MEMORY UPDATE 1: Remove submitted items from pending table immediately
      setAccountData((prev) => prev.filter((item) => !selectedItems.has(item._id)))

      // CACHE MEMORY UPDATE 2: Add submitted items to history immediately
      setHistoryData((prev) => [...submittedItemsForHistory, ...prev])

      // Clear selections and form data immediately
      setSelectedItems(new Set())
      setAdditionalData({})
      setRemarksData({})

      // Show success message immediately
      setSuccessMessage(`Successfully processed ${selectedItemsArray.length} task records! Tasks moved to history.`)

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 5000)

      // Now handle the background submission to Google Sheets
      const submissionData = await Promise.all(
        selectedItemsArray.map(async (id) => {
          const item = accountData.find((account) => account._id === id)

          console.log(`Preparing submission for item:`, {
            id: id,
            taskId: item["col1"],
            rowIndex: item._rowIndex,
            expectedTaskId: item._taskId,
          })

          let imageUrl = ""

          if (item.image instanceof File) {
            try {
              const base64Data = await fileToBase64(item.image)

              const uploadFormData = new FormData()
              uploadFormData.append("action", "uploadFile")
              uploadFormData.append("base64Data", base64Data)
              uploadFormData.append(
                "fileName",
                `task_${item["col1"]}_${Date.now()}.${item.image.name.split(".").pop()}`,
              )
              uploadFormData.append("mimeType", item.image.type)
              uploadFormData.append("folderId", CONFIG.DRIVE_FOLDER_ID)

              const uploadResponse = await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: "POST",
                body: uploadFormData,
              })

              const uploadResult = await uploadResponse.json()
              if (uploadResult.success) {
                imageUrl = uploadResult.fileUrl

                // Update the history data with the actual image URL
                setHistoryData((prev) =>
                  prev.map((historyItem) =>
                    historyItem._id === id ? { ...historyItem, col14: imageUrl } : historyItem,
                  ),
                )
              }
            } catch (uploadError) {
              console.error("Error uploading image:", uploadError)
            }
          }

          return {
            taskId: item["col1"],
            rowIndex: item._rowIndex,
            actualDate: todayFormatted,
            status: additionalData[id] || "",
            remarks: remarksData[id] || "",
            imageUrl: imageUrl,
          }
        }),
      )

      console.log("Final submission data:", submissionData)

      // Submit to Google Sheets in background
      const formData = new FormData()
      formData.append("sheetName", CONFIG.SHEET_NAME)
      formData.append("action", "updateTaskData")
      formData.append("rowData", JSON.stringify(submissionData))

      const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        // If submission failed, we could optionally rollback the cache changes
        console.error("Background submission failed:", result.error)
        // For now, we'll just log the error but keep the UI updated
        // You could implement rollback logic here if needed
      }
    } catch (error) {
      console.error("Submission error:", error)
      // Since we already updated the UI optimistically, we could rollback here
      // For now, we'll just show an error but keep the UI changes
      alert("Warning: There was an error with background submission, but your changes are saved locally.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert Set to Array for display
  const selectedItemsCount = selectedItems.size

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  <h1 className="text-2xl font-bold tracking-tight text-purple-700">
    {showHistory ? CONFIG.PAGE_CONFIG.historyTitle : CONFIG.PAGE_CONFIG.title}
  </h1>

  <div className="flex flex-col sm:flex-row sm:space-x-4 gap-3 w-full sm:w-auto">
    <div className="relative w-full sm:w-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={showHistory ? "Search history..." : "Search tasks..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
      />
    </div>

    <button
      onClick={toggleHistory}
      className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 px-4 text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
    >
      {showHistory ? (
        <div className="flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Tasks</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <History className="h-4 w-4 mr-1" />
          <span>View History</span>
        </div>
      )}
    </button>

    {!showHistory && (
      <button
        onClick={handleSubmit}
        disabled={selectedItemsCount === 0 || isSubmitting}
        className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {isSubmitting ? "Processing..." : `Submit Selected (${selectedItemsCount})`}
      </button>
    )}
  </div>
</div>


        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              {successMessage}
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-green-500 hover:text-green-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="rounded-lg border border-purple-200 shadow-md bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-4">
            <h2 className="text-purple-700 font-medium">
              {showHistory ? `Completed ${CONFIG.SHEET_NAME} Tasks` : `Pending ${CONFIG.SHEET_NAME} Tasks`}
            </h2>
            <p className="text-purple-600 text-sm">
              {showHistory
                ? `${CONFIG.PAGE_CONFIG.historyDescription} for ${userRole === "admin" ? "all" : "your"} tasks`
                : CONFIG.PAGE_CONFIG.description}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-purple-600">Loading task data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
              {error}{" "}
              <button className="underline ml-2" onClick={() => window.location.reload()}>
                Try again
              </button>
            </div>
          ) : showHistory ? (
            <>
              {/* Enhanced History Filters */}
              <div className="p-4 border-b border-purple-100 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Given By Filter */}
                  {getFilteredGivenByList().length > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="history-givenby-filter" className="mb-2 text-sm font-medium text-purple-700">
                        Filter by Given By:
                      </label>
                      <select
                        id="history-givenby-filter"
                        value={selectedGivenBy[0] || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedGivenBy([])
                          } else {
                            setSelectedGivenBy([e.target.value])
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        <option value="">All Given By</option>
                        {getFilteredGivenByList().map((givenBy, idx) => (
                          <option key={idx} value={givenBy}>
                            {givenBy}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Name Filter */}
                  {getFilteredNameList().length > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="history-name-filter" className="mb-2 text-sm font-medium text-purple-700">
                        Filter by Name:
                      </label>
                      <select
                        id="history-name-filter"
                        value={selectedNames[0] || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedNames([])
                          } else {
                            setSelectedNames([e.target.value])
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        <option value="">All Names</option>
                        {getFilteredNameList().map((name, idx) => (
                          <option key={idx} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Member Filter */}
                  {getFilteredMembersList().length > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="history-member-filter" className="mb-2 text-sm font-medium text-purple-700">
                        Filter by Member:
                      </label>
                      <select
                        id="history-member-filter"
                        value={selectedMembers[0] || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedMembers([])
                          } else {
                            setSelectedMembers([e.target.value])
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        <option value="">All Members</option>
                        {getFilteredMembersList().map((member, idx) => (
                          <option key={idx} value={member}>
                            {member}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Clear Filters Button */}
                  {(selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate || searchTerm) && (
                    <div className="flex flex-col justify-end">
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Date Range Filter */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="start-date" className="mb-2 text-sm font-medium text-purple-700">
                      From Date:
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="end-date" className="mb-2 text-sm font-medium text-purple-700">
                      To Date:
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Task Statistics */}
              <div className="p-4 border-b border-purple-100 bg-blue-50">
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">Task Completion Statistics:</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-3 py-2 bg-white rounded-md shadow-sm">
                      <span className="text-xs text-gray-500">Total Completed</span>
                      <div className="text-lg font-semibold text-blue-600">{getTaskStatistics().totalCompleted}</div>
                    </div>

                    {(selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate || searchTerm) && (
                      <div className="px-3 py-2 bg-white rounded-md shadow-sm">
                        <span className="text-xs text-gray-500">Filtered Results</span>
                        <div className="text-lg font-semibold text-blue-600">{getTaskStatistics().filteredTotal}</div>
                      </div>
                    )}

                    {selectedMembers.map((member) => (
                      <div key={member} className="px-3 py-2 bg-white rounded-md shadow-sm">
                        <span className="text-xs text-gray-500">{member}</span>
                        <div className="text-lg font-semibold text-indigo-600">
                          {getTaskStatistics().memberStats[member]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

 {/* History Table */}
<div className="overflow-x-auto">
  {/* Table for sm and above */}
  <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Given By</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Description</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATTACHED FILE</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Task Start Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freq</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable Reminders</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Require Attachment</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">Actual Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">Remarks</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachment</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredHistoryData.length > 0 ? (
        filteredHistoryData.map((history) => (
          <tr key={history._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{history["col1"] || "—"}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col2"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col3"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col4"] || "—"}</div></td>
            <td className="px-6 py-4"><div className="text-sm text-gray-900 max-w-xs" title={history["col5"]}>{history["col5"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap">
              {history["col15"] ? (
                <a href={history["col15"]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  View File
                </a>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap bg-yellow-50"><div className="text-sm text-gray-900">{history["col6"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col7"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col8"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{history["col9"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap bg-green-50"><div className="text-sm font-medium text-gray-900">{history["col10"] || "—"}</div></td>
            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                history["col12"] === "Yes" ? "bg-green-100 text-green-800" :
                history["col12"] === "No" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}>{history["col12"] || "—"}</span>
            </td>
            <td className="px-6 py-4 bg-purple-50">
              <div className="text-sm text-gray-900 max-w-xs" title={history["col13"]}>{history["col13"] || "—"}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {history["col14"] ? (
                <a href={history["col14"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center">
                  <img src={history["col14"] || "/placeholder.svg?height=32&width=32"} alt="Attachment" className="h-8 w-8 object-cover rounded-md mr-2" />
                  View
                </a>
              ) : (
                <span className="text-gray-400">No attachment</span>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={13} className="px-6 py-4 text-center text-gray-500">
            {searchTerm || selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate
              ? "No historical records matching your filters"
              : "No completed records found"}
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Cards for mobile screens */}
  <div className="sm:hidden space-y-4">
    {filteredHistoryData.length > 0 ? (
      filteredHistoryData.map((history) => (
        <div key={history._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm font-semibold text-gray-700 mb-1">Task ID: {history["col1"] || "—"}</div>
          <div className="text-sm text-gray-900 mb-1">Project: {history["col2"] || "—"}</div>
          <div className="text-sm text-gray-900 mb-1">Given By: {history["col3"] || "—"}</div>
          <div className="text-sm text-gray-900 mb-1">Name: {history["col4"] || "—"}</div>
          <div className="text-sm text-gray-900 mb-1" title={history["col5"]}>Task Description: {history["col5"] || "—"}</div>
          <div className="text-sm mb-1">
            Attached File: {history["col15"] ? (
              <a href={history["col15"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                View File
              </a>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
          <div className="text-sm mb-1 bg-yellow-50 p-1 rounded">Task Start Date: {history["col6"] || "—"}</div>
          <div className="text-sm mb-1">Freq: {history["col7"] || "—"}</div>
          <div className="text-sm mb-1">Enable Reminders: {history["col8"] || "—"}</div>
          <div className="text-sm mb-1">Require Attachment: {history["col9"] || "—"}</div>
          <div className="text-sm mb-1 bg-green-50 p-1 rounded">Actual Date: {history["col10"] || "—"}</div>
          <div className="text-sm mb-1 bg-blue-50 p-1 rounded">
            Status: <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              history["col12"] === "Yes" ? "bg-green-100 text-green-800" :
              history["col12"] === "No" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
            }`}>{history["col12"] || "—"}</span>
          </div>
          <div className="text-sm mb-1 bg-purple-50 p-1 rounded" title={history["col13"]}>Remarks: {history["col13"] || "—"}</div>
          <div className="text-sm">
            Attachment: {history["col14"] ? (
              <a href={history["col14"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center">
                <img src={history["col14"] || "/placeholder.svg?height=32&width=32"} alt="Attachment" className="h-8 w-8 object-cover rounded-md mr-2" />
                View
              </a>
            ) : (
              <span className="text-gray-400">No attachment</span>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 py-6">
        {searchTerm || selectedMembers.length > 0 || selectedGivenBy.length > 0 || selectedNames.length > 0 || startDate || endDate
          ? "No historical records matching your filters"
          : "No completed records found"}
      </div>
    )}
  </div>
</div>


            </>
          ) : (
            <>
              {/* Enhanced Pending Tasks Filters */}
              <div className="p-4 border-b border-purple-100 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Given By Filter for Pending Tasks */}
                  {getFilteredGivenByList().length > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="pending-givenby-filter" className="mb-2 text-sm font-medium text-purple-700">
                        Filter by Given By:
                      </label>
                      <select
                        id="pending-givenby-filter"
                        value={selectedGivenBy[0] || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedGivenBy([])
                          } else {
                            setSelectedGivenBy([e.target.value])
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        <option value="">All Given By</option>
                        {getFilteredGivenByList().map((givenBy, idx) => (
                          <option key={idx} value={givenBy}>
                            {givenBy}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Name Filter for Pending Tasks */}
                  {getFilteredNameList().length > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="pending-name-filter" className="mb-2 text-sm font-medium text-purple-700">
                        Filter by Name:
                      </label>
                      <select
                        id="pending-name-filter"
                        value={selectedNames[0] || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedNames([])
                          } else {
                            setSelectedNames([e.target.value])
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        <option value="">All Names</option>
                        {getFilteredNameList().map((name, idx) => (
                          <option key={idx} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Clear Filters Button for Pending Tasks */}
                  {(selectedGivenBy.length > 0 || selectedNames.length > 0 || searchTerm) && (
                    <div className="flex flex-col justify-end">
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

             

<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
    {/* Updated thead - REMOVED Project & Given By columns */}
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <input 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            checked={filteredAccountData.length > 0 && selectedItems.size === filteredAccountData.length}
            onChange={handleSelectAllItems}
          />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Task Start Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-yellow-50">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-orange-50">Remarks</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Image</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Description</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATTACHED FILE</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freq</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable Reminders</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Require Attachment</th>
      </tr>
    </thead>
    
    {/* Updated tbody - REMOVED Project & Given By columns, REORDERED as requested */}
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredAccountData.length === 0 ? (
        <tr>
          <td colSpan="12" className="px-6 py-4 text-center text-gray-500">
            {searchTerm || selectedGivenBy.length > 0 || selectedNames.length > 0 
              ? 'No pending tasks matching your filters' 
              : 'No pending tasks found (Only showing tasks with start date <= today)'
            }
          </td>
        </tr>
      ) : (
        filteredAccountData.map((account) => {
          const isSelected = selectedItems.has(account._id)
          return (
            <tr 
              key={account._id} 
              className={isSelected ? 'bg-purple-50 hover:bg-gray-50' : 'hover:bg-gray-50'}
            >
              {/* Checkbox */}
              <td className="px-6 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={isSelected}
                  onChange={(e) => handleCheckboxClick(e, account._id)}
                />
              </td>
              
              {/* Task ID */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{account.col1}</div>
              </td>
              {/* Task Start Date */}
              <td className="px-6 py-4 whitespace-nowrap bg-yellow-50">
                <div className="text-sm text-gray-900">{account.col6}</div>
              </td>
              
              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap bg-yellow-50">
                <select 
                  disabled={!isSelected}
                  value={additionalData[account._id] || ''}
                  onChange={(e) => {
                    setAdditionalData(prev => ({ ...prev, [account._id]: e.target.value }))
                    if (e.target.value !== 'No') {
                      setRemarksData(prev => {
                        const newData = { ...prev }
                        delete newData[account._id]
                        return newData
                      })
                    }
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              
              {/* Remarks */}
              <td className="px-6 py-4 whitespace-nowrap bg-orange-50">
                <input 
                  type="text" 
                  placeholder="Enter remarks" 
                  disabled={!isSelected || !additionalData[account._id]}
                  value={remarksData[account._id] || ''}
                  onChange={(e) => setRemarksData(prev => ({ ...prev, [account._id]: e.target.value }))}
                  className="border rounded-md px-2 py-1 w-full border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </td>
              {/* Upload Image */}
              <td className="px-3 py-4 bg-green-50 min-w-[120px]">
                {account.image ? (
                  <div className="flex items-center">
                    <img 
                      src={typeof account.image === 'string' ? account.image : URL.createObjectURL(account.image)} 
                      alt="Receipt" 
                      className="h-10 w-10 object-cover rounded-md mr-2 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-gray-500 break-words">
                        {account.image instanceof File ? account.image.name : 'Uploaded'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center cursor-pointer" onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = (e) => handleImageUpload(account._id, e)
                    input.click()
                  }}>
                    <Upload className="h-5 w-5 text-gray-400 mr-2 hover:text-purple-500" />
                    <span className="text-sm text-gray-400 hover:text-purple-500">Upload Image</span>
                  </div>
                )}
              </td>
              {/* Name (col4) */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.col4}</div>
              </td>
              
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
  <div className="whitespace-normal break-words">
    {account.col5}
  </div>
</td>
              
              {/* ATTACHED FILE */}
              <td className="px-6 py-4 whitespace-nowrap">
                {account.col15 ? (
                  <a 
                    href={account.col15} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    View File
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </td>
              
              
              {/* Freq */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.col7}</div>
              </td>
              
              {/* Enable Reminders */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.col8}</div>
              </td>
              
              {/* Require Attachment */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.col9}</div>
              </td>
              
              
            </tr>
          )
        })
      )}
    </tbody>
  </table>
</div>


            </>
          )}
        </div>
        {/* Camera Modal - Add this before the last closing </div> */}
{isCameraOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">📸 Take Photo</h3>
        <button
          onClick={stopCamera}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full h-[400px] object-cover"
          autoPlay
          playsInline
          muted
        />

        {isCameraLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-3"></div>
              <p>Initializing camera...</p>
            </div>
          </div>
        )}
      </div>

      {cameraError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">{cameraError}</p>
        </div>
      )}

      <div className="p-4 bg-gray-50 flex gap-3 justify-end">
        <button
          type="button"
          onClick={stopCamera}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={capturePhoto}
          disabled={isCameraLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          📸 Capture Photo
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </AdminLayout>
  )
}

export default AccountDataPage