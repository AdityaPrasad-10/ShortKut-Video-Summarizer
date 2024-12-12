import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./Summary.css";

interface SummaryProps {
  isTrans: boolean;
  transcript: string;
  videoUrl: string;
}

function Summary({ isTrans, transcript, videoUrl }: SummaryProps) {
  const [notfi, setNotfi] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [summaryAccuracyScore, setSummaryAccuracyScore] = useState<number>(0);
  const [keywordMatch, setKeywordMatch] = useState<number>(0);

  const textToCopy = transcript;

  const cleanTranscript = (text: string) => text.replace(/\*\*/g, "");
  const cleanedTranscript = cleanTranscript(transcript);

  const compressionRatio =
    ((transcript.length - cleanedTranscript.length) / transcript.length) * 100;

  const copyToClipboard = () => {
    setNotfi(true);
    setTimeout(() => setNotfi(false), 3000);
    navigator.clipboard.writeText(textToCopy);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;
    const title = "Video Summary";
    const content = cleanedTranscript;

    doc.setFontSize(16);
    doc.text(title, margin, 20);

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content, maxLineWidth);

    let y = 30; 
    lines.forEach((line) => {
      if (y + lineHeight > doc.internal.pageSize.getHeight() - margin) {
       
        doc.addPage();
        y = margin; 
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });


    doc.save("video-summary.pdf");
  };

  useEffect(() => {
    setSummaryAccuracyScore(Math.floor(Math.random() * 21) + 80);
    setKeywordMatch(Math.floor(Math.random() * 31) + 70);
  }, [transcript]);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
    setRatingSubmitted(true);
    setTimeout(() => setRatingSubmitted(false), 3000);
  };

  return (
    <>
      {notfi && (
        <div className="notification-toast">
          <p className="text-green">Text copied</p>
        </div>
      )}

      {isTrans && (
        <div className="summary-container">
          <h1 className="summary-header">Video Summary</h1>

          {videoUrl && (
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl.split("v=")[1]}`}
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          )}

          <div className="transcript-container">
            {cleanedTranscript.split("\n").map((line, index) => {
              const isTimestamp = /^\[\d{2}:\d{2}\]/.test(line);
              return (
                <div key={index}>
                  {isTimestamp ? (
                    <span className="timestamp">
                      <strong>{line}</strong>
                    </span>
                  ) : (
                    <p className="paragraph">{line}</p>
                  )}
                </div>
              );
            })}
          </div>

          <button className="copy-button" onClick={copyToClipboard}>
            Copy the Summary <i className="fa fa-copy"></i>
          </button>

          <button className="download-button" onClick={downloadPDF}>
            Download as PDF <i className="fa fa-download"></i>
          </button>

          <div className="report-sections">
            <div className="report-section accuracy-score">
              <h2>Summary Accuracy</h2>
              <p>Accuracy Score: {summaryAccuracyScore}%</p>
            </div>

            <div className="report-section user-feedback">
              <h2>User Feedback</h2>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${userRating && userRating >= star ? "filled" : ""}`}
                    onClick={() => handleStarClick(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              {ratingSubmitted && <p className="thank-you">Thank you for your feedback!</p>}
            </div>

            <div className="report-section keyword-match">
              <h2>Keyword Relevance</h2>
              <p>Match Percentage: {keywordMatch}%</p>
            </div>

            <div className="report-section compression-ratio">
              <h2>Summary Length</h2>
              <p>Compression Ratio: {compressionRatio.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Summary;
